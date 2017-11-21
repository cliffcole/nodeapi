module.exports = (sequelize, DataTypes) => {
    //console.log(DataTypes);
    let User = sequelize.define('User', {
      username: DataTypes.STRING
    });
  
    User.associate = (models) => {
      User.hasMany(models.Review);
    }
    return User;
  };