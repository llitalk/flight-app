const dal = require('../dal/dal');

module.exports.notifyVacationChange = ({ action, vacation }) => {
    const { io } = require('../socket');
    io.emit('vacationChange', action, vacation);
};

module.exports.getVacations = async ({ userId }) => {
    const getVacationsQuery = `
        SELECT v.*,
            (CASE WHEN EXISTS (SELECT 1
                                FROM vacations_users
                                WHERE vacations_users.vacationid = v.id AND
                                        vacations_users.userid = ${userId}
                                )
                    THEN 1 ELSE 0
            END) as followed
        FROM vacation v;    
    `;

    const vacations = await dal.execute(getVacationsQuery);

    return vacations;
};

module.exports.getVacation = async ({ id }) => {
    const getVacationQuery = `
        SELECT * FROM vacation
        WHERE id = '${id}'
    `;

    const vacation = await dal.execute(getVacationQuery);

    return vacation && vacation.length && vacation[0];
};

module.exports.createVacation = async ({ description, price, startDate, endDate, target, picture }) => {
    const insertVacationQuery = `
      INSERT INTO vacation
      VALUES (NULL, '${description}', '${price}', '${picture}', '${startDate}', '${endDate}', '${target}')
    `;

    const result = await dal.execute(insertVacationQuery);

    const vacation = await this.getVacation({ id: result.insertId });

    this.notifyVacationChange({ action: 'addVacation', vacation });
    
    return vacation;
};

module.exports.updateVacation = async ({ id, description, price, startDate, endDate, target, picture }) => {
    const updateVacationQuery = `
      UPDATE vacation SET description='${description}', price='${price}', picture='${picture}',startDate='${startDate}', endDate='${endDate}',target='${target}'
      WHERE id = ${id}
    `;

    const result = await dal.execute(updateVacationQuery);

    const vacation = await this.getVacation({ id });

    this.notifyVacationChange({ action: 'updateVacation', vacation });

    return vacation;
};

module.exports.deleteVacation = async ({ id }) => {

    const removeAllFollowersQuery = `
        DELETE FROM vacations_users WHERE vacationid = '${id}'
    `;
    await dal.execute(removeAllFollowersQuery);

    const removeVacationQuery = `
        DELETE FROM vacation WHERE id = ${id}
    `;

    const result = await dal.execute(removeVacationQuery);

    this.notifyVacationChange({ action: 'deleteVacation', vacation: { id } });

    return result;
};

module.exports.followVacation = async ({ vacationId, userId }) => {
    const findUserWithVacationQuery = `SELECT * FROM vacations_users WHERE vacationid = '${vacationId}' and userid='${userId}'`;

    const findResult = await dal.execute(findUserWithVacationQuery);
    if (findResult && findResult.length > 0) {
        return; // already exist, do nothing. no error.
    }

    const addFollowToVacationQuery = `INSERT INTO vacations_users VALUES ('${vacationId}','${userId}')`;

    const result = await dal.execute(addFollowToVacationQuery);

    return result;
};

module.exports.unfollowVacation = async ({ vacationId, userId }) => {
    const findUserWithVacationQuery = `SELECT * FROM vacations_users WHERE vacationid = '${vacationId}' and userid='${userId}'`;

    const findResult = await dal.execute(findUserWithVacationQuery);
    if (findResult && findResult.length === 0) {
        return; // already exist, do nothing. no error.
    }

    const removeFollowFromVacationQuery = `DELETE FROM vacations_users WHERE vacationid = '${vacationId}' and userid='${userId}'`;

    const result = await dal.execute(removeFollowFromVacationQuery);

    return result;
};

module.exports.getVacationStats = async () => {
    const getVacationQuery = `
        SELECT * FROM vacation
        LEFT JOIN vacations_users ON vacations_users.vacationid = vacation.id
    `;

    const stats = await dal.execute(getVacationQuery);

    return stats;
};
