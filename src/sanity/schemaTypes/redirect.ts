  import { defineField, defineType } from "sanity";

  export const redirectType = defineType({
    name: "redirect",
    title: "Redirects",
    type: "document",
    fields: [
        defineField({
            name: "source",
            title: "Source url",
            type: "string",
            description: "Path to redirect FROM. Must start with/. Example: /old-blog-post",
            validation: (Rule) => 
                Rule.required()
                     .regex(/^\//, { name: "must start with /" })
                     .custom((value) => {
                        if (value && value.includes(" ")) return "No  spaces allowed"; 
                        return true;
                     }),
        }),
         
        defineField({
            name: "destination",
            title: "Destination url",
            type: "string",
            description: "Path or full URL to redirect TO.      Example: /en/visa or https://example.com",
            validation: (Rule) => Rule.required(),
        }),
        
        defineField({
            name: "type",                                       
            title: "Redirect Type",                           
            type: "string",                       
            options: {                        
            list: [
            { title: "301 — Permanent (SEO: passes link equity)", value: "301" },                   
            { title: "302 — Temporary (SEO: does NOT pass link equity)", value: "302" },                          
          ],                                                
          layout: "radio",
        },                                                  
        initialValue: "301",                              
        validation: (Rule) => Rule.required(),
      }), 

      defineField({
        name: "enabled",                                  
        title: "Enabled",
        type: "boolean",   
        description: "Turn off to disable this redirect without deleting it",
        initialValue: true,
      }),
    ],

     preview: {
        select: {
            source: "source",
            destination: "destination",
            type: "type",
            enabled: "enabled",
        },
        prepare({ source, destination, type, enabled }) {
            return {
                title: `${source} -> ${destination}`,
                subtitle: `${type}${enabled === false ? " . DISABLED " : ""}`,
            };
        },
     },

        orderings:[
            {
                title: "source (A-Z)",
                name: "sourceAsc",
                by: [{ field: "source", direction: "asc" }],
            },
        ],
  });