import { createHmac } from 'crypto';

import type { Bot } from '@bot';
import type { WebAppUser } from '@typings/WebAppUser';

export function createWebAppApi(bot: Bot) {
    const isValidUserData = (input: string): boolean => {
        const encoded = decodeURIComponent(input);

        const secret = createHmac('sha256', 'WebAppData').update(bot.config.secret);

        const arr = encoded.split('&');
        const hashIndex = arr.findIndex(str => str.startsWith('hash='));
        const expected = arr.splice(hashIndex)[0].split('=')[1];

        arr.sort((a, b) => a.localeCompare(b));
        const dataCheckString = arr.join('\n');

        const actual = createHmac('sha256', secret.digest())
            .update(dataCheckString)
            .digest('hex');

        return actual === expected;
    };

    const getUserData = (input: string): WebAppUser | undefined => {
        if (!isValidUserData(input)) {
            return undefined;
        }

        try {
            const params = new URLSearchParams(input);

            /*
userdata:
user=%7B%22id%22%3A123456%2C%22first_name%22%3A%22firstName%22%2C%22last_name%22%3A%22lastName%22%2C%22username%22%3A%22username123%22%2C%22language_code%22%3A%22en%22%2C%22allows_write_to_pm%22%3Atrue%7D&chat_instance=-9999999999999999999&chat_type=private&auth_date=1717926073&hash=hash123456abcdef
    ->
{
    'user' => '{"id":123456,"first_name":"firstName","last_name":"lastName","username":"username123","language_code":"en","allows_write_to_pm":true}',
    'chat_instance' => '-9999999999999999999',
    'chat_type' => 'private',
    'auth_date' => '1717926073',
    'hash' => 'hash123456abcdef'
}
user - is WebAppUser in JSON
            */

            return JSON.parse(params.get('user') ?? '{}');
        } catch {
            return undefined;
        }
    };

    return { isValidUserData, getUserData };
}
