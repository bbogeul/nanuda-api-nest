require('dotenv').config();
import * as Slack from 'slack-node';
import { Injectable } from '@nestjs/common';
import { ConsultNotificationType, SlackUserName } from '../shared';
import { BaseService } from './base.service';

const env = process.env;
const webhookUrl = env.SLACK_URL;
const slack = new Slack();
@Injectable()
export class SendSlackNotificationSercvice extends BaseService {
  constructor() {
    super();
  }

  /**
   * new slack notification for visit consults
   * @param message
   */
  async productConsultSlackNotification(message) {
    console.log('product consult');
    slack.setWebhook(webhookUrl);
    slack.webhook({
      text: `${message.userName}님께서 ${ConsultNotificationType.productConsult}했습니다. \n희망시간: ${message.hopeTime} \n Tel: ${message.userPhone}`,
      username: SlackUserName.nanudaConsult,
      attachments: [
        {
          fallback: `${ConsultNotificationType.productConsult}:  <${process.env.ADMIN_URL}plan-meetings/${message.referenceId}>`,
          pretext: `${ConsultNotificationType.productConsult}: <${process.env.ADMIN_URL}plan-meetings/${message.referenceId}>`,
          color: '#009900',
          fields: [
            {
              title: `${ConsultNotificationType.productConsult}`,
              value: '해당 링크 통해서 확인 바랍니다.',
              short: false,
            },
          ],
        },
      ],
    });
  }
}
