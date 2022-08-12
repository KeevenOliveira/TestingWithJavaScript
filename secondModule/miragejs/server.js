import { Server } from 'miragejs'

export const makeServer = ({ environment = 'development' } = {}) => {
  return new Server({
    environment,
    routes() {
      this.namespace = 'api'

      this.get('/users', (schema) => {
        return schema.users.all()
      })
    },
  })
}
