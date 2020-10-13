import { pause, withEffect } from './libs.js';

const getName = withEffect(async (user) => {
    if (!user.name) {
        user.name = await getName.perform('ask_name');
    }

    return user.name;
});

(async () => {
    console.log(await getName({ name: 'Some Name' }));

    getName.handle(async effect => {
        if (effect === 'ask_name') {
            await pause(1000);
            return 'Arya Stark';
        }
    });

        console.log(await getName({ title: 'No Name' }));

        getName.handle(() => 'Rob Stark');

            console.log(await getName({ title: 'No Name' }));

        getName.end();

        console.log(await getName({ title: 'No Name' }));

    getName.end();

    try {
        console.log(await getName({ title: 'No Name' }));
    } catch (e) {
        console.error('Uuups, handler shoud be set');
    }
})();
