# Telegram Bot API

## Examples

### Single bot

```ts
import { Bot } from '@veluga/telegram';

const bot = new Bot({ secret: '123:abc' });

bot.on('message', message => {
    // Send message manually
    await bot.client.sendMessage({
        chat_id: message.chat.id,
        text: 'Hello, world!',
    });

    // Send sticker
    await bot.client.sendSticker({
        chat_id: message.chat.id,
        sticker_id: '123456abcdef',
    });

    // Send photo
    await bot.client.sendPhoto({
        chat_id: message.chat.id,
        // by URL
        photo: 'https://example.com/photo.jpg',
        // by path on device
        photo: '/tmp/photo.jpg',
        // by stream
        photo: fs.createReadStream('/tmp/photo.jpg'),
    });

    // Universal function for reply:
    // text
    await bot.sendMessageUniversal(message, 'text', {
        text: 'Hello',
    });

    // photo
    await bot.sendMessageUniversal(message, 'photo', {
        caption: 'Hello',
        photo: 'https://example.com/photo.jpg',
    });
});
```

### With state manager
```ts
import { Bot, StateManager } from '@veluga/telegram';

// Create bot client
const bot = new Bot({ secret: '123:abc' });

// Create state manager with possible states (TState)
const stateManager = new StateManager<TState>();

/**
 *
 *  entry -> list -> item
 *            ^       |
 *            +-------+
 */

// Describe all possible states, all states will contain 'step' property
interface IStateEntry {
    step: 'entry';
}

interface IState

bot.use(stateManager);

bot.startPolling();
```