client.on("messageUpdate", function(oldMessage, newMessage) {
  client.channels.cache
    .get("loglarin-gonderilecegi-kanalin-idsi")
    .send(
      `:grey_question: | **${oldMessage.author.tag} (${oldMessage.author.id})** "${oldMessage.content}" mesajını şu mesajla: "${newMessage.content}" değiştirdi. `
    );
});