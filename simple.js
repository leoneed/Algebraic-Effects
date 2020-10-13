import { pause, handle } from './libs.js';

const getName = async (user) => {
    if (!user.name) {
        user.name = await getName.perform('ask_name');
    }

    return user.name;
};

handle(getName, async effect => {
    if (effect === 'ask_name') {
        await pause(1000);
        return 'Arya Stark';
    }
});

(async () => {
    console.log(await getName({ name: 'Some Name' }));
    console.log(await getName({ title: 'No Name' }));
})();
