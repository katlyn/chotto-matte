"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.strings = {
    setCode: {
        missingArgs: 'Whoops, looks like you forgot to add a code to your command.',
        isNaN: 'Doesn\'t look like that\'s actually a number, make sure you\'ve got it correct!',
        incorrectFormat: 'That doesn\'t look like a valid code from my end. Make sure you double check it!',
        storing: 'Alright, storing that to the database...',
        error: 'Something went wrong! I wasn\'t able to store that to the database, let an admin know so they can investigate.',
        success: 'Everything looks good! Successfully stored your code as `$c`.'
    },
    getCode: {
        pending: 'Looking up that information...',
        personalNotFound: 'Looks like you don\'t have a code set up yet. Use the `!code set <code>` command to set one.',
        notFound: 'That user hasn\'t set up their code yet.',
        personal: 'Your code is currently set to **`$c`**.',
        user: '$m\'s code is **`$c`**.',
        invalidArgs: 'I\'m not sure I understand that. Make sure you mention a user if you want to get their code. Use `!help code` for more information on this command.'
    },
    remove: {
        pending: 'Deleting your code...',
        success: 'Done! Your code has been removed, if it was stored previously.'
    },
    reset: {
        confirm: 'Are you sure you want to reset all codes? This can\'t be undone. Use `!code reset yes` to confirm.',
        pending: 'Resetting all codes...',
        success: 'All codes have been reset.'
    },
    help: {
        codes: {
            quick: 'Management of user codes.',
            full: 'Add, remove, and get the codes of users. Mention a user to get their code.'
        },
        set: {
            quick: 'Set your code.',
            full: 'Set your code. Code must be a number and four or fewer characters. `!code set 1234`'
        },
        list: {
            quick: 'List all codes.',
            full: 'List all codes.'
        },
        remove: {
            quick: 'Remove your code from the database.',
            full: 'Remove your code from the database'
        },
        reset: {
            quick: 'Resets all codes in the database.',
            full: 'Resets all codes in the database. This action cannot be undone.'
        }
    },
    permissionDenied: 'Sorry, but you don\'t have permission to run this command!',
    descrition: 'A Cool Bot'
};
//# sourceMappingURL=strings.js.map