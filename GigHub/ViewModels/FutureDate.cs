using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Globalization;
using System.Linq;
using System.Web;

namespace GigHub.ViewModels
{
    public class FutureDate : ValidationAttribute
    {
        public override bool IsValid(object value)
        {
            DateTime dateTime;
            bool isValid = DateTime.TryParseExact(Convert.ToString(value), 
                "dd/MM/yyyy", 
                CultureInfo.CurrentCulture, 
                DateTimeStyles.None, 
                out dateTime);
            bool isFuture = dateTime > DateTime.Now;

            return (isValid && isFuture);
        }
    }
}