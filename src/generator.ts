import { resolve } from 'path';
import { writeFileSync } from 'fs';
import * as mysql from 'mysql';
// might need this later...
// import * as lodash from 'lodash';

let connection;
function generateCodeManagementFile(callback) {
  connection.query(
    // tslint:disable-next-line: quotemark
    "SELECT `CATEGORY_1`, `KEY` FROM `CODE_MANAGEMENT` WHERE DEL_YN = 'N' ORDER BY `CATEGORY_1` ASC, `KEY` ASC, `ORDER_BY` ASC, `createdAt` ASC",
    (err, items) => {
      if (err) throw err;
      if (process.env.NODE_ENV === 'development') {
        console.log(
          `[GENERATED CODE MANAGEMENT] + ${items.length} rows gathered.`,
        );
      }
      let output = '';
      let codes = '';

      codes = items.reduce((acc, cur) => {
        if (!acc[cur.CATEGORY_1]) {
          acc[cur.CATEGORY_1] = [];
        }
        acc[cur.CATEGORY_1].push(cur.KEY);
        return acc;
      }, {});

      Object.keys(codes).forEach(CATEGORY_1 => {
        output += `export enum ${CATEGORY_1} {\n`;
        codes[CATEGORY_1].forEach(KEY => {
          output += ` '${KEY}' = '${KEY}', \n`;
        });
        output += `}\n`;
        output += `export const CONST_${CATEGORY_1}  = Object.values(${CATEGORY_1});\n`;
        output += `\n`;
      });

      const filePath = resolve('src/shared/code-management.type.ts');
      writeFileSync(filePath, output, { encoding: 'utf8' });
      console.log(`[generator] generated file: ${filePath}`);
      if (callback) callback();
    },
  );
}

function generateFoodCategoryType(callback) {
  connection.query(
    // tslint:disable-next-line: quotemark
    "SELECT `CODE`, `NAME_KR` FROM `FOOD_CATEGORY` WHERE DEL_YN = 'N' ORDER BY `CODE` ASC, `createdAt` ASC",
    (err, items) => {
      if (err) throw err;
      if (process.env.NODE_ENV === 'development') {
        console.log(
          `[GENERATED FOOD CATEGORY] + ${items.length} rows gathered.`,
        );
      }
      let output = '';
      let codes = '';

      codes = items.reduce((acc, cur) => {
        if (!acc[cur.CODE]) {
          acc[cur.CODE] = [];
        }
        acc[cur.CODE].push(cur.NAME_KR);
        return acc;
      }, {});

      Object.keys(codes).forEach(CODE => {
        output += `export enum ${CODE} {\n`;
        codes[CODE].forEach(NAME_KR => {
          output += ` '${NAME_KR}' = '${NAME_KR}', \n`;
        });
        output += `}\n`;
        output += `export const CONST_${CODE}  = Object.values(${CODE});\n`;
        output += `\n`;
      });

      const filePath = resolve('src/shared/food-category.type.ts');
      console.log(filePath);
      writeFileSync(filePath, output, { encoding: 'utf8' });
      console.log(`[generator] generated food category file: ${filePath}`);
      console.log(filePath);
      if (callback) callback();
    },
  );
}

// generate CODE_MANAGEMENT
const generate = (async () => {
  // todo: create bash profile for deployment
  //   환경변수로 값들을 이동해야함
  connection = mysql.createConnection({
    host: '210.89.178.123',
    port: '3306',
    user: 'joseph_nanuda',
    password: 'Sksnek8183#3',
    database: 'nanuda_platform_test',
  });
  generateFoodCategoryType(() => {
    // if (connection) connection.end();
    console.log('Generating');
  });
  generateCodeManagementFile(() => {
    if (connection) connection.end();
    // process.exit();
  });
})();

export { generate };
