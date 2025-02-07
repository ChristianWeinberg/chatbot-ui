"use client";

import { ChatbotUIContext } from "@/context/context";
import { fetchHostedModels, fetchOpenRouterModels } from "@/lib/models/fetch-models";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
import { APIStep } from "../../../components/setup/api-step";
import { FinishStep } from "../../../components/setup/finish-step";
import { ProfileStep } from "../../../components/setup/profile-step";
import { SETUP_STEP_COUNT, StepContainer } from "../../../components/setup/step-container";

export default function SetupPage() {
  const {
    profile,
    setProfile,
    setWorkspaces,
    setSelectedWorkspace,
    setEnvKeyMap,
    setAvailableHostedModels,
    setAvailableOpenRouterModels,
  } = useContext(ChatbotUIContext);

  const router = useRouter();

  const [loading, setLoading] = useState(false); // Fjernet afhængighed af session
  const [currentStep, setCurrentStep] = useState(1);

  // Profile Step
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState(profile?.username || "");
  const [usernameAvailable, setUsernameAvailable] = useState(true);

  // API Step
  const [useAzureOpenai, setUseAzureOpenai] = useState(false);
  const [openaiAPIKey, setOpenaiAPIKey] = useState("");
  const [openaiOrgID, setOpenaiOrgID] = useState("");
  const [azureOpenaiAPIKey, setAzureOpenaiAPIKey] = useState("");
  const [azureOpenaiEndpoint, setAzureOpenaiEndpoint] = useState("");
  const [azureOpenai35TurboID, setAzureOpenai35TurboID] = useState("");
  const [azureOpenai45TurboID, setAzureOpenai45TurboID] = useState("");
  const [azureOpenai45VisionID, setAzureOpenai45VisionID] = useState("");
  const [azureOpenaiEmbeddingsID, setAzureOpenaiEmbeddingsID] = useState("");
  const [anthropicAPIKey, setAnthropicAPIKey] = useState("");
  const [googleGeminiAPIKey, setGoogleGeminiAPIKey] = useState("");
  const [mistralAPIKey, setMistralAPIKey] = useState("");
  const [groqAPIKey, setGroqAPIKey] = useState("");
  const [perplexityAPIKey, setPerplexityAPIKey] = useState("");
  const [openrouterAPIKey, setOpenrouterAPIKey] = useState("");

  useEffect(() => {
    // Midlertidig placeholder-logik
    const isLoggedIn = true; // Antag, at brugeren er logget ind
    if (!isLoggedIn) {
      router.push("/login");
    } else {
      setLoading(false);
    }
  }, []);

  const handleShouldProceed = (proceed: boolean) => {
    if (proceed) {
      if (currentStep === SETUP_STEP_COUNT) {
        handleSaveSetupSetting();
      } else {
        setCurrentStep(currentStep + 1);
      }
    } else {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSaveSetupSetting = async () => {
    // Placeholder: Gem API-nøgler og brugervalgt opsætning
    const updatedProfile = {
      ...profile,
      has_onboarded: true,
      display_name: displayName,
      username,
      openai_api_key: openaiAPIKey,
      openai_organization_id: openaiOrgID,
      anthropic_api_key: anthropicAPIKey,
      google_gemini_api_key: googleGeminiAPIKey,
      mistral_api_key: mistralAPIKey,
      groq_api_key: groqAPIKey,
      perplexity_api_key: perplexityAPIKey,
      openrouter_api_key: openrouterAPIKey,
      use_azure_openai: useAzureOpenai,
      azure_openai_api_key: azureOpenaiAPIKey,
      azure_openai_endpoint: azureOpenaiEndpoint,
      azure_openai_35_turbo_id: azureOpenai35TurboID,
      azure_openai_45_turbo_id: azureOpenai45TurboID,
      azure_openai_45_vision_id: azureOpenai45VisionID,
      azure_openai_embeddings_id: azureOpenaiEmbeddingsID,
    };

    setProfile(updatedProfile);

    const workspaces = [
      {
        id: "home-workspace-id",
        is_home: true,
        name: "Home Workspace",
      },
    ]; // Placeholder data

    const homeWorkspace = workspaces.find((w) => w.is_home);

    setSelectedWorkspace(homeWorkspace!);
    setWorkspaces(workspaces);

    router.push(`/${homeWorkspace?.id}/chat`);
  };

  const renderStep = (stepNum: number) => {
    switch (stepNum) {
      // Profile Step
      case 1:
        return (
          <StepContainer
            stepDescription="Let's create your profile."
            stepNum={currentStep}
            stepTitle="Welcome to Chatbot UI"
            onShouldProceed={handleShouldProceed}
            showNextButton={!!(username && usernameAvailable)}
            showBackButton={false}
          >
            <ProfileStep
              username={username}
              usernameAvailable={usernameAvailable}
              displayName={displayName}
              onUsernameAvailableChange={setUsernameAvailable}
              onUsernameChange={setUsername}
              onDisplayNameChange={setDisplayName}
            />
          </StepContainer>
        );

      // API Step
      case 2:
        return (
          <StepContainer
            stepDescription="Enter API keys for each service you'd like to use."
            stepNum={currentStep}
            stepTitle="Set API Keys (optional)"
            onShouldProceed={handleShouldProceed}
            showNextButton={true}
            showBackButton={true}
          >
            <APIStep
              openaiAPIKey={openaiAPIKey}
              openaiOrgID={openaiOrgID}
              azureOpenaiAPIKey={azureOpenaiAPIKey}
              azureOpenaiEndpoint={azureOpenaiEndpoint}
              azureOpenai35TurboID={azureOpenai35TurboID}
              azureOpenai45TurboID={azureOpenai45TurboID}
              azureOpenai45VisionID={azureOpenai45VisionID}
              azureOpenaiEmbeddingsID={azureOpenaiEmbeddingsID}
              anthropicAPIKey={anthropicAPIKey}
              googleGeminiAPIKey={googleGeminiAPIKey}
              mistralAPIKey={mistralAPIKey}
              groqAPIKey={groqAPIKey}
              perplexityAPIKey={perplexityAPIKey}
              useAzureOpenai={useAzureOpenai}
              onOpenaiAPIKeyChange={setOpenaiAPIKey}
              onOpenaiOrgIDChange={setOpenaiOrgID}
              onAzureOpenaiAPIKeyChange={setAzureOpenaiAPIKey}
              onAzureOpenaiEndpointChange={setAzureOpenaiEndpoint}
              onAzureOpenai35TurboIDChange={setAzureOpenai35TurboID}
              onAzureOpenai45TurboIDChange={setAzureOpenai45TurboID}
              onAzureOpenai45VisionIDChange={setAzureOpenai45VisionID}
              onAzureOpenaiEmbeddingsIDChange={setAzureOpenaiEmbeddingsID}
              onAnthropicAPIKeyChange={setAnthropicAPIKey}
              onGoogleGeminiAPIKeyChange={setGoogleGeminiAPIKey}
              onMistralAPIKeyChange={setMistralAPIKey}
              onGroqAPIKeyChange={setGroqAPIKey}
              onPerplexityAPIKeyChange={setPerplexityAPIKey}
              onUseAzureOpenaiChange={setUseAzureOpenai}
              openrouterAPIKey={openrouterAPIKey}
              onOpenrouterAPIKeyChange={setOpenrouterAPIKey}
            />
          </StepContainer>
        );

      // Finish Step
      case 3:
        return (
          <StepContainer
            stepDescription="You are all set up!"
            stepNum={currentStep}
            stepTitle="Setup Complete"
            onShouldProceed={handleShouldProceed}
            showNextButton={true}
            showBackButton={true}
          >
            <FinishStep displayName={displayName} />
          </StepContainer>
        );
      default:
        return null;
    }
  };

  if (loading) {
    return null;
  }

  return (
    <div className="flex h-full items-center justify-center">
      {renderStep(currentStep)}
    </div>
  );
}
