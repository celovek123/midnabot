const Sandbox = require('sandbox')

const { configs } = require('../configs')

const sandbox = new Sandbox()

const js = () => (ctx) => {
  const message = ctx.update.message
  message.entities.map((entity) => {
    if (entity.type === 'code' || entity.type === 'pre') {
      const code = message.text.substring(entity.offset, entity.offset + entity.length)
      sandbox.run(code, (output) => {
        let message = '```\n'
        output.console.map((cons) => message += `${cons}\n`)
        message += '```'
        ctx.replyWithMarkdown(message)
        if (output.result !== 'null') {
          ctx.replyWithMarkdown(`\`${output.result}\``)
        }
      })
    }
  })
}

module.exports = { js }
