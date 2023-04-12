import {reactive,} from "vue";

export class Grouper {
    #groups;
    #onAdd;
    #onRemove;
    
    constructor(groups, onAddCallback, onRemoveCallback) {
        this.#initGroups(groups);
        this.#onAdd = onAddCallback;
        this.#onRemove = onRemoveCallback;
    }
    
    #initGroups(groups){
        this.#groups = [];
        groups.forEach(element => {
            this.#groups[element] = reactive([]);
        })
    }

    #canBeAdded(groupName){
        if(this.#containsGroup(groupName) === false) {
            return true;
        }
        
        return this.#groups[groupName].length < 3
    }
    
    addToGroup(groupName, value){
        if(this.#containsGroup(groupName) === false){
            this.#createGroup(groupName);
        }

        if(this.#tryFillEmpty(groupName, value) === true){
            return;
        }
        
        if(this.#canBeAdded(groupName) === false){
            return
        }

        this.#groups[groupName].push(value);
        this.#onAdd(value);
    }
    
    #tryFillEmpty(groupName, value){
        let targetIndex = -1

        const group = this.#groups[groupName]
        for(let i = 0; i < group.length; i++){
            if(group[i] == null){
                targetIndex = i;
                break;
            }
        }
        
        if(targetIndex === -1){
            return false;
        }
        group[targetIndex] = value;
        this.#onAdd(value);
        return true
    }
    
    getReactive(groupName){
        return this.#groups[groupName];
    }
    
    removeFromGroup(groupName, value){
        if(this.#containsGroup(groupName) === false){
            return;
        }
        
        const group = this.#groups[groupName];
        const index = group.indexOf(value)
        group[index] = null;
        this.#onRemove(value); 
        
    }
    
    #containsGroup(groupName){
        return groupName in this.#groups;
    }
    
    #createGroup(groupName){
        this.#groups[groupName] = [];
    }
}