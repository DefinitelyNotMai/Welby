using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace WWA_CORE.Utilities
{
    public class KeyValuePair
    {
        public KeyValuePair()
        {

        }

        public KeyValuePair(int key, string value)
        {
            Key = key;
            Value = value;
        }

        public int Key { get; set; }
        public string Value { get; set; }
    }

    public class KeyValueString
    {
        public KeyValueString()
        {

        }

        public KeyValueString(string key, string value)
        {
            Key = key;
            Value = value;
        }

        public string Key { get; set; }
        public string Value { get; set; }
    }
}
