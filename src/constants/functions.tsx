export const functions = [
  {
    name: "send_feedback",
    description: "Send the feedback based on metrics on the inclusive feedback",
    parameters: {
      type: "object",
      properties: {
        pronounUsage: {
          type: "object",
          properties: {
            score: {
              type: "integer",
              description: "The score for the metric, out of 5",
              minimum: 1,
              maximum: 5,
            },
            feedback: {
              type: "string",
              description: "The specific feedback related to Pronoun Usage",
            },
          },
          required: ["score", "feedback"],
        },
        insenstiveLanguage: {
          type: "object",
          properties: {
            score: {
              type: "integer",
              description: "The score for the metric, out of 5",
              minimum: 1,
              maximum: 5,
            },
            feedback: {
              type: "string",
              description:
                "The specific feedback related to Insensitive Language",
            },
          },
          required: ["score", "feedback"],
        },
        stereotypes: {
          type: "object",
          properties: {
            score: {
              type: "integer",
              description: "The score for the metric, out of 5",
              minimum: 1,
              maximum: 5,
            },
            feedback: {
              type: "string",
              description: "The specific feedback related to stereotypes",
            },
          },
          required: ["score", "feedback"],
        },
        exclusiveLanguage: {
          type: "object",
          properties: {
            score: {
              type: "integer",
              description: "The score for the metric, out of 5",
              minimum: 1,
              maximum: 5,
            },
            feedback: {
              type: "string",
              description:
                "The specific feedback related to Exclusive Language",
            },
          },
          required: ["score", "feedback"],
        },
        inclusivePhrases: {
          type: "object",
          properties: {
            score: {
              type: "integer",
              description: "The score for the metric, out of 5",
              minimum: 1,
              maximum: 5,
            },
            feedback: {
              type: "string",
              description: "The specific feedback related to Inclusive Phrases",
            },
          },
          required: ["score", "feedback"],
        },
        improvedText: {
          type: "string",
          description: "An improved text that contains the feedback provided",
        },
      },
      required: [
        "pronounUsage",
        "insenstiveLanguage",
        "stereotypes",
        "exclusiveLanguage",
        "inclusivePhrases",
        "improvedText",
      ],
    },
  },
];


// export const functions = [
//   {
//     name: "send_feedback",
//     description: "Send the feedback based on metrics on the inclusive feedback",
//     parameters: {
//       type: "object",
//       properties: {
//         metricMetaData: {
//           type: "object",
//           pronounUsage: {
//             type: "object",
//             score: {
//               type: "integer",
//               description: "The score for the metric, out of 5",
//               minimum: 1,
//               maximum: 5,
//             },
//             feedback: {
//               type: "string",
//               description: "The specific feedback related to Pronoun Usage",
//             },
//           },
//           insenstiveLanguage: {
//             type: "object",
//             score: {
//               type: "integer",
//               description: "The score for the metric, out of 5",
//               minimum: 1,
//               maximum: 5,
//             },
//             feedback: {
//               type: "string",
//               description: "The specific feedback related to Insensitive Language",
//             },
//           },
//           stereotypes: {
//             type: "object",
//             score: {
//               type: "integer",
//               description: "The score for the metric, out of 5",
//               minimum: 1,
//               maximum: 5,
//             },
//             feedback: {
//               type: "string",
//               description: "The specific feedback related to stereotypes",
//             },
//           },
//           exclusiveLanguage: {
//             type: "object",
//             score: {
//               type: "integer",
//               description: "The score for the metric, out of 5",
//               minimum: 1,
//               maximum: 5,
//             },
//             feedback: {
//               type: "string",
//               description: "The specific feedback related to Exclusive Language",
//             },
//           },
//           inclusivePhrases: {
//             type: "object",
//             score: {
//               type: "integer",
//               description: "The score for the metric, out of 5",
//               minimum: 1,
//               maximum: 5,
//             },
//             feedback: {
//               type: "string",
//               description: "The specific feedback related to Inclusive Phrases",
//             },
//           },
//         },
//         improvedText: {
//           type: "string",
//           description: "An improved text that contains the feedback provided",
//         },
//         // unit: { type: "string", enum: [""] },
//       },
//       required: ["metricMetaData", "improvedText"],
//     },
//   },
// ];
