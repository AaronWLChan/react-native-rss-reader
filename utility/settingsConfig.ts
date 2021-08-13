import ROUTES from "../navigation/routes"

const settings: PreferenceGroup[] = [

    { title: "General", 
      data: [

        {
          title: "Dark Mode",
          key: "darkMode",
          action: "switch",
          icon: "moon",
          color: "#000000",
          defaultValue: false
        },

      ]
    
    },
   
  ]

  export default settings