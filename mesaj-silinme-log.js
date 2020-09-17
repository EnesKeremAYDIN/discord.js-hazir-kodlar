client.on("messageDelete", messageDelete => {
  messageDelete.channel.client.channels.cache
    .get("loglarin-gonderilecegi-kanalin-idsi")
    .send(
      `:x: | **${messageDelete.author.tag} (${messageDelete.author.id})** şu mesajı sildi: ${messageDelete.content}`
    );
});