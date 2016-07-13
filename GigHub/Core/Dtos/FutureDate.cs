using System;
using System.ComponentModel.DataAnnotations;
using System.Globalization;

namespace GigHub.Core.Dtos
{
    public class FutureDate : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            DateTime dateTime;
            bool isValid = DateTime.TryParse(Convert.ToString(value), out dateTime);
            bool isFuture = dateTime > DateTime.Now;

            return (isValid && isFuture);
        }
    }
}