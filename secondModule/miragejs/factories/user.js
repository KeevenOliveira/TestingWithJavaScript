import { Factory } from 'miragejs';

import { faker } from '@faker-js/faker';
import { randomNumber } from './utils';

export default {
  user: Factory.extend({
    name() {
      return faker.name.fullName();
    },
    mobile() {
      return faker.unique(faker.datatype.uuid);
    },
    afterCreate(user, server) {
      const messages = server.createList('message', randomNumber(10), { user });

      user.update({ messages });
    },
  }),
};
