let projectId=null;
let userUid = null;
let hasLesson = false;
let isLessonCreator = false;
const scrollableSteps = document.querySelector('.scrollable-steps');

function getUrlData(){
    const searchParams = new URLSearchParams(window.location.search);
    if(searchParams.has("uid")){
        userUid = searchParams.get("uid");
    }
    if(searchParams.has("projectId")){
        projectId = searchParams.get("projectId");
        if(projectId==="$$lesson$$creator$$"){
            isLessonCreator = true;
            setupLessonCreator();
            return;
        }
    }
    if(userUid===getStoredUser().uid){
        loadProjectCode(projectId);
    }
}

function loadProjectCode(id){
    user = getStoredUser();
    database.ref("userdata/"+user.uid+"/projects/"+projectId).once('value').then((snapshot) => {
        const data = snapshot.val();
        writeToEditor(data.code);
        if(data.lessonId!=="none"){
            loadLesson(data.lessonId);
        }else{
            setupPanes(false);
        }
    });
}

function loadLesson(id){
    database.ref("lessons/"+id).once('value').then((snapshot) => {
        const data = snapshot.val();
        if(data!==null) {
            scrollableSteps.innerHTML = "";
            populateSteps(data)
        }else{
            console.log("invalid lesson identifier!");
            setupPanes(false);
        }
    });
}

function populateSteps(data){
    console.log(data);
    let count = 1;
    for (let step of data.steps) {
        createStep(step.head,step.content,step.image,step.type,count);
        count++;
    }
    createBufferSpace()
    setupPanes(true);
}

function createStep(head,content,image,type,count){
    let stepEl = document.createElement("editor-step");
    stepEl.setAttribute("head", head);
    stepEl.setAttribute("type", type);
    stepEl.setAttribute("count", count);
    stepEl.setAttribute("image", image);
    stepEl.innerHTML = content;
    scrollableSteps.appendChild(stepEl);
}

function createBufferSpace(){
    let buffer = document.createElement("div");
    buffer.classList.add("buffer");
    scrollableSteps.appendChild(buffer);
}

function writeToEditor(data){
    const transaction = editor.state.update({changes: {from: 0, to: editor.state.doc.length, insert: data}})
    const update = editor.state.update(transaction);
    editor.update([update]);
}

getUrlData()