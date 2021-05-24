exports.getFormattedPrice = (price) => Number(parseFloat(price).toFixed(2));

exports.updateInstance = (instance, updatedFields) => {
  const updatedInstance = instance;

  Object.keys(updatedFields).forEach((k) => {
    updatedInstance[k] = updatedFields[k];
  });

  return updatedInstance;
};
