import CharacterView from './CharacterView';
import { systemPrompt } from '@/schemas/initialPrompt';


const getInitialData = async () => {
  const body = JSON.stringify({
    prompt: systemPrompt,
    max_tokens: 100,
    temperature: 0.9,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0.6,
    role: 'system'
  })

  const caller = await fetch('https://towvmwvg96.execute-api.us-east-2.amazonaws.com/openai/chatgpt', {
    method: 'POST',
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    body
  })
  const data = await caller.json()
  return [{
    content: systemPrompt,
    role: 'system'
  }, data]
}

const Page = async () => {
  const data = await getInitialData();
  return (
    <section>
      <CharacterView data={data} />
    </section>
  );
};

export default Page;
