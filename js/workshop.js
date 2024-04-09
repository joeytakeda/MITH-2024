/* ACE editor stuff  */
let editor = ace.edit("editor");
editor.setTheme("ace/theme/chrome");
editor.session.setMode("ace/mode/xml");
editor.session.setUseWrapMode(true);
editor.renderer.setOption('showPrintMargin', false);
editor.setOptions({
     fontSize: "14px" 
});

let ceteiDiv = document.getElementById('cetei');
/* Now CETEI stuff */
document.getElementById('view').addEventListener('click', render);

let delsBtn = document.getElementById('dels');
delsBtn.addEventListener('change', e => {
    if (document.getElementById('cetei').classList.contains('nodels')){
        document.getElementById('cetei').classList.remove('nodels');
    }  else {
        document.getElementById('cetei').classList.add('nodels');
    }
    
});


document.querySelectorAll('button[data-src]').forEach(btn => {
    let btnSrc = btn.getAttribute('data-src');
    btn.addEventListener('click', e => {
       fetch('xml/' + btnSrc + ".xml")
       .then(response => { return response.text()})
       .then(doc => {
          editor.setValue(doc);
          render();
       });
    });
    if (btnSrc == 'helloworld'){
        btn.click();
    }
});

function render(){
     let CETEIcean = new CETEI();
     ceteiDiv.innerHTML = '';
     CETEIcean.makeHTML5(editor.getValue(), (data) => {
        document.getElementById('cetei').appendChild(data);
             ceteiDiv.scrollTop = 0;
     });

}



    function showInstructions(){
                var showInstructions = document.getElementById('showInstructions');
                var hideInstructions = document.getElementById('hideInstructions');
                var instructions = document.getElementById('instructions');
                showInstructions.classList.add('invisible');
                instructions.classList.remove('invisible');
                hideInstructions.classList.remove('invisible');
            }
            
            function hideInstructions(){
                 var showInstructions = document.getElementById('showInstructions');
                var hideInstructions = document.getElementById('hideInstructions');
                 var instructions = document.getElementById('instructions');
                showInstructions.classList.remove('invisible');
                   instructions.classList.add('invisible');
                hideInstructions.classList.add('invisible');
            }
            