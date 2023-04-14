import { reactive,} from "vue";

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
            this.#groups[element.name] = reactive(element);
        })
    }

    #containsGroup(groupName) {
        return groupName in this.#groups;
    }

    #tryFillEmpty(group, value) {
        const groupData = this.getData(group.name);
        for (let i = 0; i < groupData.length; i++) {
            if (groupData[i] == null) {
                groupData[i] = value
                this.#onAdd(value);
                return
            }
        }
    }

    #hasFreeSlot(groupName) {
        if (this.#containsGroup(groupName) === false) {
            return false;
        }

        const groupData = this.getData(groupName);
        for (let i = 0; i < groupData.length; i++) {
            if (groupData[i] == null) {
                return true;
            }
        }

        return false;
    }

    getData = (groupName) => this.#groups[groupName].data;

    getGroupId = (groupName) => this.#groups[groupName].id;
    
    getKeys = () => Object.keys(this.#groups);
    
    hasFreeGroup() {
        const keys = Object.keys(this.#groups);

        for (let i = 0; i < keys.length; i++) {
            const element = keys[i];
            if (this.#hasFreeSlot(element) === true) {
                return true;
            }
        }

        return false;
    }

    addToGroup(group, value) {
        if (this.#containsGroup(group.name) === false) {
            return;
        }

        this.#tryFillEmpty(group, value);
    }

    removeFromGroup(groupName, value) {
        if (this.#containsGroup(groupName) === false) {
            return;
        }

        const groupData = this.#groups[groupName].data;
        const index = groupData.indexOf(value)
        groupData[index] = null;

        this.#onRemove(value);
    }
}

export class Group {
    id
    #name
    #size
    data

    constructor(groupData, size = 3) {
        this.id = groupData.group_id;
        this.#name = groupData.group_name;
        
        this.#size = size;
        this.#initData();
    }

    #initData() {
        this.data = [];
        for (let i = 0; i < this.#size; i++) {
            this.data.push(null);
        }
    }

    get name() {
        return this.#name;
    }
}