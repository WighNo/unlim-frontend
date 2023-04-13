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

    #initGroups(groups) {
        this.#groups = [];

        groups.forEach(element => {
            const groupName = element.name;

            this.#groups[groupName] = reactive(element);
        })
    }

    addToGroup(group, value) {
        if (this.#containsGroup(group) === false) {
            return;
        }

        this.#tryFillEmpty(group, value);
    }

    #tryFillEmpty(group, value) {
        console.log(group)
        console.log(value)

        const groupData = this.#groups[group.name].data;
        for (let i = 0; i < groupData.length; i++) {
            if (groupData[i] == null) {
                groupData[i] = value
                this.#onAdd(value);
                return
            }
        }
    }

    getReactive(groupName) {
        return this.#groups[groupName].data;
    }

    removeFromGroup(groupName, value) {
        if (this.#containsGroup(groupName) === false) {
            return;
        }

        const group = this.#groups[groupName];
        const index = group.indexOf(value)
        group[index] = null;
        this.#onRemove(value);

    }

    #containsGroup(group) {
        return group.name in this.#groups;
    }
}

export class Group {
    #name
    #size
    data
    
    constructor(name, size) {
        this.#name = name;
        this.#size = size;
        this.#initData();
    }
    
    #initData(){
        this.data = [];
        for(let i = 0; i < this.#size; i++){
            this.data.push(null);
        }
    }

    get name(){
        return this.#name;
    }
}