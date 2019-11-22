const botSettings = require("./botsettings.json");
const Discord = require("discord.js");
const prefix = botSettings.prefix;
favemoji = null;
const bot = new Discord.Client();
const { Client, Attachment } = require('discord.js');
//This Is called with !staff and Starts a Thread
const helpEmbed = new Discord.RichEmbed()
.setColor('#0099ff')
.setTitle('Thread Created')
.setDescription('Our Staff Team Will Get Back To You As Soon As Possible')
.setTimestamp()
.setFooter('To Close Thread Push The Lock Button', 'https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1024px-Flag_of_Germany.svg.png');
//This is Called to end a Thread
const noEmbed = new Discord.RichEmbed()
.setColor('#0099ff')
.setTitle('Thread Closed')
.setDescription('Thread Has Been Closed')
.setTimestamp()
.setFooter('To Open a new Thread Say !help', 'https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Flag_of_Germany.svg/1024px-Flag_of_Germany.svg.png');

bot.on("ready", async () => {
	console.log(`Bot is ready! ${bot.user.username}`);
try {
	 let link = await bot.generateInvite(["ADMINISTRATOR"]);
	 console.log(link);
} catch(e) {
	console.log(e.stack);
}
});
bot.on("message", async message => {

	let messageArray = message.content.split(" ");
	let command = messageArray[0];
	args = messageArray.slice(1);
	let num = messageArray[1];

	if(!command.startsWith(prefix)) return;

	if(command === `${prefix}userinfo`) {
		let embed = new Discord.RichEmbed()
			.setAuthor(message.author.username)
			.setDescription("This is the user's info!")
			.setColor("#0066ff")
			.addField("Full Username", `${message.author.username}#${message.author.discriminator}`)
			.addField("ID", message.author.id)
			.addField("Created At", message.author.createdAt)
			.setTimestamp();
	message.channel.send(embed);
}

	if (command === `${prefix}rip`) {
        // Create the attachment using Attachment
        const attachment = new Attachment('https://i.imgur.com/w3duR07.png');
        // Send the attachment in the message channel
        message.channel.send(attachment);
    }

	if (command === `${prefix}avatar`) {
			message.reply('Getting your avatar ' + message.author)
    		message.reply(message.author.avatarURL);
    	}

	if(command === `${prefix}help`) {
		let helpmessage = new Discord.RichEmbed()
			.setAuthor(message.author.username)
			.addField("!userinfo", `Will display your name ${message.author.username}`)
			.addField("!staff", `Will Start A Thread`)
			.setTimestamp();
		message.channel.send(helpmessage);
	}
    	if (command === `${prefix}purge`) {
        //Deletes 100 messages
         async function purge() {
            if (message.member.roles.find(r => r.name === "Admin") || message.member.roles.find(r => r.name === "Owner")) {
           	message.delete();
            const fetched = await message.channel.fetchMessages({limit: 100});
            message.channel.bulkDelete(fetched);
     
        }
      }
        purge();
    }
    	if (command == `${prefix}remove`) {
        async function clear() {
        if (message.member.roles.find(r => r.name === "Admin") || message.member.roles.find(r => r.name === "Owner")) { 
            message.delete();
            const fetched = await message.channel.fetchMessages({limit: num});
            message.channel.bulkDelete(fetched);
            bot.channels.get("641442259417563138").send(num + " Messages Have Been Deleted By " + message.author)
        }
    }

    clear();
    }

    if(command === `${prefix}plan`) {
    	const planEmbed = new Discord.RichEmbed()
		.setColor('#0099ff')
		.setTitle("Plan's For Upcoming Updates")
		.setDescription('Plans')
		.addField("I am Planning on add a Mute To admins can mute people from !staff")
		.setTimestamp();
    }


	if(command === `${prefix}staff`) {
		message.react('✅');
		bot.channels.get("641442259417563138").send(message.author + " Started A Thread And Needs Help @here");
message.author.send(helpEmbed).then(async (msg) => {
	msg.react('🔒')
  // Create a collector to listen for button presses
  const collector = msg.createReactionCollector((reaction, user) => user !== bot.user);

  // Every time a button is pressed, run this function.
  collector.on('collect', async (messageReaction) => {
    // If the x button is pressed, remove the message.
    if (messageReaction.emoji.name === '🔒') {
      message.author.send(noEmbed);
      bot.channels.get("641442259417563138").send(message.author + " Closed There Thread and does not need help @here");
      collector.stop(); // Delete the collector.
      return;
    }
});
});
}	

});

bot.login(botSettings.token);