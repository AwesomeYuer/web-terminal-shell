import { Terminal } from './node_modules/xterm/lib/xterm.js';
import { AttachAddon } from './node_modules/xterm-addon-attach/lib/xterm-addon-attach.js';


    var term = new Terminal();
    
    //const fitAddon = new FitAddon();
    //term.loadAddon(fitAddon);
    
//    terminal.loadAddon(new WebLinksAddon());

    term.open(document.getElementById('terminal'));
    //fitAddon.fit();

    
    term.focus()
    const socketURL = "ws://localhost:8020/socket";
    const ws = new WebSocket(socketURL);
    attachAddon = new AttachAddon(ws);
    term.loadAddon(attachAddon);