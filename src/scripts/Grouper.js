import {ref} from "vue";

export class Grouper {
    #groups;
    #onAdd;
    #onRemove;
    
    #reactive= [];
    
    #indexGroupForAdd
    
    constructor(groups, onAddCallback, onRemoveCallback) {
        this.#initGroups(groups);
        this.#onAdd = onAddCallback;
        this.#onRemove = onRemoveCallback;
    }
    
    #initGroups(groups){
        this.#groups = [];
        groups.forEach(element => {
            this.#groups.push(element);
            this.#reactive[element] = ref([]);
        })
        this.#indexGroupForAdd = 0;
    }
    
    #updateIndexGroupForAdd(){
        this.#indexGroupForAdd++;
        
        if(this.#indexGroupForAdd >= this.#groups.length){
            this.#indexGroupForAdd = 0;
        }
    }
    
    addToGroup(value){
        const groupName = this.#groups[this.#indexGroupForAdd]
        
        if(this.#containsGroup(groupName) === false){
            this.#createGroup(groupName);
        }
        
        this.#groups[groupName].push(value);
        this.#reactive[groupName].value.push(value);
        this.#onAdd(value);

        this.#updateIndexGroupForAdd();
    }
    
    getGroupName(index){
        return this.#groups[index];
    }
    
    getReactive(index){
        return this.#reactive[this.getGroupName(index)];
    }
    
    removeFromGroup(groupName, value){
        if(this.#containsGroup(groupName) === false){
            return;
        }
        
        const group = this.#groups[groupName];
        const element = group.find(x => x.id === value.id);
        
        if(element !== null) {
            group.splice(element, 1);
        }
        
        this.#onRemove(value);        
    }
    
    #containsGroup(groupName){
        return groupName in this.#groups;
    }
    
    #createGroup(groupName){
        this.#groups[groupName] = [];
    }
}