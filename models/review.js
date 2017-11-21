module.exports = (sequelize, DataTypes) => {
    let Review = sequelize.define('Review', {
      review: DataTypes.TEXT,
      city: DataTypes.STRING,
      country: DataTypes.STRING,
      rating: DataTypes.INTEGER,
      username: DataTypes.STRING
    });
    /* Review.associate = (models) => {
    
    } */
    return Review;
  };