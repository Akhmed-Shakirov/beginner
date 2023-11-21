const character = {
    characteristic: {
        experience: [
            {
                date: 'Master',
                level: {
                    value: 22,
                    watch: true,
                    rrs: null
                }
            },
            {
                date: 'beginning',
                level: {
                    value: 100,
                    watch: true,
                    rrs: 'Big'
                }
            }
        ]
    }
}
const path = [ 'characteristic', 'experience', '[1]', 'level', 'value' ]
const getValueByPath = (obj: any, path: string[]): any => {
    return path.reduce((acc, key) => {
        if (typeof acc === 'object' && acc !== null && key.startsWith('[') && key.endsWith(']')) {
            const index = parseInt(key.slice(1, -1), 10);
            return acc[index];
        }
        return acc && acc[key];
    }, obj);
}
console.log(getValueByPath(character, path)) // Выводит 100
