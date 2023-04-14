export class DataFormatter {
    #grouper

    constructor(grouper) {
        this.#grouper = grouper;
    }

    format() {
        const keys = this.#grouper.getKeys();
        const result = [];

        for (let i = 0; i < keys.length; i++) {
            const key = keys[i];
            const groupId = this.#grouper.getGroupId(key);
            const data = this.#grouper.getData(key);
            data.forEach(element => {
                result.push({
                    player_id: element.id,
                    group_id: groupId,
                })
            })
        }
        
        return result;
    }
}