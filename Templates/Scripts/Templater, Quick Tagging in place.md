<%*  
// Quick Tag Script for Alt+T  
const predefinedTags = [  
"#📥inbox", "#🔄active", "#⏳waiting", "#🎯priority-high", "#✅completed",  
"#📦archived", "#💡idea", "#⚗️experiment", " #💼work", "#🏠home", "#🗺️map ", "#🔥on", "#♻️ongoing", "#🌊simmering ", "#💤sleeping", "#🚀project", "#📚source",  
"#👤contact", "#🤝meeting", "#🧹tidy", "#🚤boat", "#🌱develop", "#❔question", "#📝concept "  
];  
const selectedTag = await tp.system.suggester(  
predefinedTags.map(tag => tag.replace("#", "")),  
predefinedTags  
);  
if (selectedTag) {  
// Insert tag at cursor position  
return selectedTag + " ";  
}  
%> 