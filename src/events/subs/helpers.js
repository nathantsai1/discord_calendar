function make_string(stringy, interaction_id) {
    let stringed = `<@${interaction_id}>` + '```' + stringy + '```';
    return stringed;
}

module.exports = {make_string};