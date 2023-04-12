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
        
        if(this.#canBeAdded(groupName) === false){
            this.#tryFillEmpty(groupName)
        }

        this.#groups[groupName].push(value);
        this.#onAdd(value);
    }
    
    #tryFillEmpty(groupName, value){
        const group = this.#groups[groupName]
        let targetIndex = -1
        
        group.forEach((element, index) => {
            if(element !== null){
                targetIndex = index;
            }
        })
        
        if(targetIndex !== -1) {
            group[targetIndex] = value;
        }
    }
    
    getReactive(groupName){
        return this.#groups[groupName];
    }
    
    removeFromGroup(groupName, value){
        if(this.#containsGroup(groupName) === false){
            return;
        }
        
        const group = this.#groups[groupName];
        const element = group.find(x => x.id === value.id);
        const index = group.indexOf(element)
        group[index] = null;
        console.log(group)
        
        this.#onRemove(value);        
    }
    
    #containsGroup(groupName){
        return groupName in this.#groups;
    }
    
    #createGroup(groupName){
        this.#groups[groupName] = [];
    }
}