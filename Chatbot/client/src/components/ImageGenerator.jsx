import axios from 'axios';
import { useState } from 'react';
import { ThreeDots } from 'react-loader-spinner';

function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(false);

  const generateImage = async () => {
    if (!prompt.trim()) return alert('Please enter a prompt!');

    setLoading(true);
    setImageUrl('');

    try {
      const response = await axios.post(
        'http://localhost:5050/api/v1/images/generations',
        {
          prompt,
          n: 1,
          size: '1024x1024',
        },
        {
          headers: {
            // 'Content-Type': 'application/json',
            provider: 'open-ai',
            mode: 'production',
          },
        }
      );
      //   console.log(response);
      //   setImageUrl(response.data[0].url)

      const generatedImageUrl = response.data[0].url;
      if (generatedImageUrl) {
        setImageUrl(generatedImageUrl);
      } else {
        alert('failed to generate image');
      }
    } catch (error) {
      console.error('error generating image', error);
      alert(error.response.data.error);
    } finally {
      setLoading(false);
      setPrompt('');
    }
  };

  //   console.log(prompt);

  return (
    <div className='flex flex-col items-center justify-center h-screen bg-zinc-900 text-white'>
      <h2 className='text-4xl font-bold pb-8'>🖼️ IMAGE GENERATOR</h2>

      <div className='w-full max-w-lg bg-zinc-800 rounded-lg p-4'>
        <input
          type='text'
          value={prompt}
          onKeyDown={(e) => {
            if (e.key === 'Enter') generateImage();
          }}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder='Enter a prompt for the image...'
          className='w-full p-3 bg-zinc-900 border-gray-500 rounded-lg
          focus:outline-none focus:ring-2 focus:ring-zinc-500 mb-4'
        />
        <button
          onClick={generateImage}
          className='w-full px-4 py-2 font-semibold bg-yellow-500 rounded-lg hover:bg-yellow-600 disabled:opacity-50'
          disabled={loading}
        >
          {loading ? 'Generating...' : 'Generate Image'}
        </button>

        {imageUrl && (
          <div className='mt-6'>
            <h2 className='text-lg font-bold mb-4'>Generated Image:</h2>
            <img
              src={imageUrl}
              alt='generatedAI-image'
              className='w-full rounded-lg'
            />
          </div>
        )}
        {/* 
        {loading ? (
          <div className='flex items-center justify-center mt-2'>
            <ThreeDots visible={true} height={48} width={48} color='#7171A' />
          </div>
        ) : imageUrl ? (
          <div className='mt-6'>
            <h2 className='text-lg font-bold mb-4'>Generated Image:</h2>
            <img
              src={imageUrl}
              alt='generatedAI-image'
              className='w-full rounded-lg'
            />
          </div>
        ) : null} */}
      </div>
    </div>
  );
}

export default ImageGenerator;
