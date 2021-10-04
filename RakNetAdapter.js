const RakNetServer = (require("bluebirdmc-raknet") ?? require("raknet"));

class Logger {
    debug(message) {
        return console.log(message)
    }
}

class RakNetAdapter {
    constructor(server){
        this.server = server
        this.raknet = new RakNetServer(19132, new Logger())
	this.playerCount = 0
        this.raknet.getServerName()
            .setMotd("RakNet Test")
            .setName("RakNet")
            .setProtocol(465)
            .setVersion("1.17.32")
            .setOnlinePlayers(this.playerCount) // update players +1 and -1 if u will make software
            .setMaxPlayers(10)// u can change
            .setServerId(1)// change with +1
            .setGamemode("Creative")
        this.logger = new Logger()
    }

    sendPacket(player, packet, needACK, immediate){
        // do for send packets
        this.logger.debug("Sending "+packet.getName()+": " + packet.buffer)
    }

    tick(){
        this.raknet.getSessionManager().readOutgoingMessages().forEach(message => this._handleIncomingMessage(message.purpose, message.data));

        this.raknet.getSessionManager().getSessions().forEach(session => {
            // use batch packet
        });
    }

    close(player, reason = "unknown reason"){
        //check if player online this example for creating software
        this.raknet.getSessionManager().removeSession(this.raknet.getSessionManager().getSession(player._ip, player._port), reason);
    }

    shutdown(){
        this.raknet.shutdown();
    }

    _handleIncomingMessage(purpose, data){
        switch(purpose){
            case "openSession":
		//Do Things
                this.playerCount += 1;
                break;
            case "closeSession":
		// Do Things
                this.playerCount -= 1;
                break;
        }
    }
}

module.exports = RakNetAdapter;
