﻿import { reactive,} from "vue";

/**
 * @constructor
 */
export class Grouper {
    #groups;
    #onAdd;
    #onRemove;

    /**
     * @param  {Group[]} groups Список групп
     * @param  {function} onAddCallback функция, срабатывающая при добавлении
     * @param  {function} onRemoveCallback функция, срабатывающая при удалении
     */
    constructor(groups, onAddCallback, onRemoveCallback) {
        this.#initGroups(groups);
        this.#onAdd = onAddCallback;
        this.#onRemove = onRemoveCallback;
    }

    /**
     * Инициализирует группы
     * @private
     * @param  {Group[]} groups список групп
     */
    #initGroups(groups) {
        this.#groups = [];

        groups.forEach(element => {
            this.#groups[element.name] = reactive(element);
        })
    }

    /**
     * Содержит группу
     * @private
     * @param  {String} groupName название группы
     */
    #containsGroup(groupName) {
        return groupName in this.#groups;
    }

    /**
     * @private вфыцвфы
     * @param  {String} groupName название группы
     */
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

    /**
     * @private
     * @param  {String} groupName название группы
     */
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


    /**
     * Получить данные группы по её названию
     * @param  {String} groupName Название группы
     */
    getData = (groupName) => this.#groups[groupName].data;

    /**
     * Получить идентификатор группы по названию
     * @param {String} groupName Название группы
     */
    getGroupId = (groupName) => this.#groups[groupName].id;

    /**
     * Получить ключи групп
     */
    getKeys = () => Object.keys(this.#groups);

    /**
     * Есть свободная группа
     * @return {Boolean}
     */
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

    /**
     * Добавить в группу
     * @param {Group} group Группа 
     * @param {PlayerData} value Игрок 
     */
    addToGroup(group, value) {
        if (this.#containsGroup(group.name) === false) {
            return;
        }

        this.#tryFillEmpty(group, value);
    }

    /**
     * Удалить из группы
     * @param  {String} groupName название группы
     * @param {Player} value игрок
     */
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

/**
 * @class Group Группа
 */
export class Group {
    /**
     * Идентификатор группы
     */
    id
    #name
    #size

    /**
     * Данные группы
     */
    data

    constructor(groupData, size = 3) {
        this.id = groupData.group_id;
        this.#name = groupData.group_name;
        
        this.#size = size;
        this.#initData();
    }

    /**
     * @private
     * Инициализирует данные
     */
    #initData() {
        this.data = [];
        for (let i = 0; i < this.#size; i++) {
            this.data.push(null);
        }
    }

    /**
     * Название группы 
     * @returns {String}
     */
    get name() {
        return this.#name;
    }
}