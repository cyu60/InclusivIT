import { type NextPage } from "next";
import Head from "next/head";
import { Configuration, OpenAIApi } from "openai";
import { type Dispatch, type SetStateAction, useState } from "react";
import {
  dummyMessage,
  emptyFeedbackData,
  systemPrompt,
} from "~/constants/constants";
import { functions } from "../constants/functions";
import { type FeedbackData, type Metric } from "../constants/types";
import { Footer } from "../components/Footer";
import { Navbar } from "../components/Navbar";
import { Spinner, CodeIcon } from "../constants/Icons";

if (!process.env.NEXT_PUBLIC_OPEN_AI_API_KEY) {
  throw new Error("Missing API key");
}
const configuration = new Configuration({
  apiKey: process.env.NEXT_PUBLIC_OPEN_AI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const Home: NextPage = () => {
  const [userInput, setUserInput] = useState(dummyMessage);
  const [feedback, setFeedback] = useState<FeedbackData>(emptyFeedbackData);
  const [summaryReport, setSummaryReport] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const generateSummaryReport = async () => {
    setIsLoading(true);

    const assistantResponseObj = await openai.createChatCompletion({
      model: "gpt-4-0613",
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        { role: "user", content: userInput },
      ],
      functions: functions,
      function_call: { name: "send_feedback" },
    });

    // Parse for each content here:
    // Use the function call capability
    console.log(assistantResponseObj?.data?.choices[0]?.message?.function_call);
    const functionResponse =
      assistantResponseObj?.data?.choices[0]?.message?.function_call;
    if (functionResponse) {
      const functionDetails: FeedbackData = JSON.parse(
        functionResponse.arguments as string
      ) as FeedbackData;

      setSummaryReport(functionDetails.improvedText);
      setFeedback(functionDetails);
      console.log(functionDetails);
    }

    setIsLoading(false);
  };

  return (
    <>
      <Head>
        <title>InclusivIT App</title>
        <meta name="description" content="InclusivIT App" />
        <link rel="icon" href="" />
      </Head>
      <main className="min-h-screen bg-green-800">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <div className="flex flex-col items-center justify-center gap-12 px-4 py-16">
          <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
            InclusivIT Language Checker
          </h1>
          <div className="min-h-full w-full max-w-6xl rounded-lg bg-white p-6 shadow-lg">
            {/* Add input box with button */}
            <UserInputBox
              isLoading={isLoading}
              userInput={userInput}
              setUserInput={setUserInput}
            ></UserInputBox>
            <List feedback={feedback} />
            <button
              className={
                userInput === ""
                  ? "mt-4 rounded bg-gray-500 px-4 py-2 text-white"
                  : "mt-4 rounded bg-green-500 px-4 py-2 text-white"
              }
              onClick={() => void generateSummaryReport()}
              disabled={isLoading || userInput === ""}
            >
              {isLoading ? <Spinner /> : "Generate Review Report"}
            </button>
            {summaryReport && (
              <div className="mt-4 rounded bg-green-100 p-3">
                <p className="text-lg font-semibold">
                  Better response based on feedback:
                </p>
                <div className="flex space-x-2">
                  <textarea
                    onChange={(e) => void setSummaryReport(e.target.value)}
                    value={summaryReport}
                    rows={6}
                    className="w-full rounded-lg border p-3 shadow-inner focus:outline-none focus:ring-2 focus:ring-gray-300 lg:w-9/12"
                  />
                </div>
                <button
                  onClick={() =>
                    void navigator.clipboard.writeText(summaryReport)
                  }
                  className="mt-5 rounded-md bg-green-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
                >
                  Copy
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <Footer />
      </main>
    </>
  );
};

const UserInputBox: React.FC<{
  userInput: string;
  setUserInput: Dispatch<SetStateAction<string>>;
  isLoading: boolean;
}> = ({ isLoading, userInput, setUserInput }) => {
  return (
    <div className="flex flex-col items-center p-6">
      {/* Subheading */}
      <p className="mb-4 text-gray-600">
        Enter your text below to check for inclusive language usage:
      </p>

      {/* User Input */}
      <textarea
        className="w-full rounded-lg border p-3 shadow-inner focus:outline-none focus:ring-2 focus:ring-gray-300 lg:w-9/12"
        rows={5}
        onChange={(e) => setUserInput(e.target.value)}
        value={userInput}
        disabled={isLoading}
        placeholder="Type your text here..."
      ></textarea>

      {/* Loading Indicator */}
      {isLoading && (
        <p className="mt-3 animate-bounce text-gray-500">
          Analyzing your text...
        </p>
      )}
    </div>
  );
};

const List: React.FC<{
  feedback: FeedbackData;
}> = ({ feedback }) => {
  const metrics: Metric[] = [
    {
      name: "Pronoun Usage",
      description:
        "Checks if the correct pronouns are being used based on the user's information",
      icon: <CodeIcon />,
      score: feedback.pronounUsage.score,
      feedback: feedback.pronounUsage.feedback,
    },
    {
      name: "Insensitive Language",
      description:
        "Scans for potentially offensive or insensitive terms and phrases",
      icon: <CodeIcon />,
      score: feedback.insenstiveLanguage.score,
      feedback: feedback.insenstiveLanguage.feedback,
    },
    {
      name: "Stereotypes",
      description: "Checks if the text perpetuates harmful stereotypes",
      icon: <CodeIcon />,
      score: feedback.stereotypes.score,
      feedback: feedback.stereotypes.feedback,
    },
    {
      name: "Exclusive Language",
      description:
        "Identifies binary language that may exclude non-binary or gender non-conforming individuals",
      icon: <CodeIcon />,
      score: feedback.exclusiveLanguage.score,
      feedback: feedback.exclusiveLanguage.feedback,
    },
    {
      name: "Inclusive Phrases",
      description:
        "Checks for the presence of inclusive phrases and encourages their use",
      icon: <CodeIcon />,
      score: feedback.inclusivePhrases.score,
      feedback: feedback.inclusivePhrases.feedback,
    },
  ];

  return (
    <div className="rounded-lg bg-white p-6">
      <ul className="mt-4 list-disc pl-6">
        {metrics.map((metric, index) => (
          <li
            key={index}
            className="mt-2 flex items-start gap-4 rounded border p-3 transition-shadow hover:shadow-md"
          >
            <div
              className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-gray-500`}
            >
              {metric.icon}
            </div>
            <div className="flex-grow">
              <p className="font-semibold text-green-600">{metric.name}</p>
              <p className="text-gray-700">{metric.description}</p>
              {metric.feedback.length > 0 && (
                <div>
                  <p className="mt-2 text-sm text-gray-500">
                    Feedback: {metric.feedback}
                  </p>
                </div>
              )}
            </div>
            {metric.feedback.length > 0 && (
              <div className="self-ends flex flex-col items-center justify-self-end">
                <div
                  className={
                    metric.score > 3
                      ? "flex h-16 w-16 items-center justify-center rounded-full bg-green-100"
                      : "flex h-16 w-16 items-center justify-center rounded-full bg-red-100"
                  }
                >
                  <p
                    className={
                      metric.score > 3
                        ? "text-2xl font-semibold text-green-600"
                        : "text-2xl font-semibold text-red-600"
                    }
                  >
                    {metric.score}/5
                  </p>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Home;
