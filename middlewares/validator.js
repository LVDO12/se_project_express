const { Joi, celebrate } = require('celebrate');
const validator = require('validator');

const urlValidator = (value,helpers) =>{
  if(validator.isURL(value,{require_protocol:true})){
    return value;
  }
  return helpers.message("Invalid URL format");
}

module.exports.validateCreateItem = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": "Name must be at least 2 characters long.",
      "string.max": "Name must be at most 30 characters long.",
      "string.empty": "Name is required.",
    }),
    weather: Joi.string().required().valid('hot','warm','cold').messages({
      "any.only": "Weather must be one of the following: hot, warm, cold."
    }),
    imageUrl: Joi.string().required().custom(urlValidator).messages({
      "string.empty": "Image URL is required.",
      "string.uri": "Image URL must be a valid URL."
    }),
  })
});

module.exports.validateSignUp = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": "Name must be at least 2 characters long.",
      "string.max": "Name must be at most 30 characters long.",
      "string.empty": "Name is required.",
    }),
    email: Joi.string().required().email().messages({
      "string.email": "You must enter a valid email address.",
      "string.empty": "Email is required.",
    }),
    password: Joi.string().required().min(6).messages({
      "string.min": "Password must be at least 6 characters long.",
      "string.empty": "Password is required.",
    }),
    avatar: Joi.string().required().custom(urlValidator).messages({
      "string.empty": "Avatar URL is required.",
      "string.uri": "Avatar URL must be a valid URL."
    }),
  })
});


module.exports.validateLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().messages({
      "string.email": "You must enter a valid email address.",
      "string.empty": "Email is required.",
    }),
    password: Joi.string().required().min(6).messages({
      "string.min": "Password must be at least 6 characters long.",
      "string.empty": "Password is required.",
    }),
  })
});

module.exports.validateUpdateProfile = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).messages({
      "string.min": "Name must be at least 2 characters long.",
      "string.max": "Name must be at most 30 characters long.",
      "string.empty": "Name is required.",
    }),
    avatar: Joi.string().required().custom(urlValidator).messages({
      "string.empty": "Avatar URL is required.",
      "string.uri": "Avatar URL must be a valid URL."
    }),
  })
});

module.exports.validateItemId = celebrate({
  params: Joi.object().keys({
    itemId: Joi.string().hex().length(24).required().messages({
      "string.length": "Item ID must be 24 characters long.",
      "string.hex": "Item ID must be a valid hexadecimal string.",
      "string.empty": "Item ID is required.",
    }),
  })
});

