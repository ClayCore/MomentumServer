const secrets = {
    dbUri: 'mongodb+srv://root:ecoquest2019@ecoquest-3ufot.mongodb.net/test?retryWrites=true&w=majority'
};

const getSecret = key => secrets[key];

module.exports = getSecret;