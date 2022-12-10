module.exports = {
    name: "ready",
    once: true,
    async execute(client) {
        console.log(`Pronto!!! ${client.user.tag} è entrato ed è online!`);
    }
}