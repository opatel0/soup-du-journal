const seedData = {
    users: [
        {
            username: 'MindCanvas',
            password: 'password',
        },
        {
            username: 'ThoughtTrove',
            password: 'password'
        }
    ],

    journeys: [
        {
          title: 'Daily Reflections',
          description: 'Thoughts, musings, and reflections on my day-to-day experiences.'
        },
        {
          title: 'Travel Adventures',
          description: 'Memories, anecdotes, and insights from my travels around the world.'
        },
        {
          title: 'Recipe Collection',
          description: 'Favorite recipes, culinary experiments, and cooking adventures.'
        },
        {
          title: 'Fitness Journey',
          description: 'Workouts, progress tracking, and motivational quotes for my fitness journey.'
        }
    ],
      

    experiences: [
        // Daily Reflections
        { title: 'Monday Reflection', content: "Today was quite eventful. I woke up feeling motivated, but as the day progressed, I found myself facing unexpected challenges at work. Despite the hurdles, I managed to stay focused and accomplish my tasks. Reflecting on the day, I realize the importance of resilience and adaptability in overcoming obstacles." },
        { title: 'Tuesday Reflection', content: "This morning started with a sense of anticipation for what the day might bring. However, as the day unfolded, I encountered several setbacks that tested my patience. Despite the frustrations, I made a conscious effort to maintain a positive attitude and find moments of gratitude in the little things. It's remarkable how a shift in perspective can turn a challenging day into a valuable learning experience." },
        { title: 'Wednesday Reflection', content: "As the week progresses, I find myself reflecting on my goals and aspirations. Today was a mix of highs and lows, with moments of clarity interspersed with periods of uncertainty. Amidst the chaos, I remind myself to stay true to my values and embrace the journey, knowing that each challenge is an opportunity for growth." },
      
        // Travel Adventures
        { title: 'Paris Escapade', content: "Exploring the streets of Paris felt like stepping into a painting. The city's charm captivated my senses, from the aroma of freshly baked croissants to the breathtaking views of the Eiffel Tower at sunset. Each cobblestone alleyway revealed a new adventure, and with every step, I felt a profound sense of wanderlust." },
        { title: 'Island Paradise', content: "Waking up to the sound of waves gently lapping against the shore, I realized that paradise was not merely a concept but a tangible reality. The azure waters beckoned, inviting me to dive into a world of vibrant marine life and hidden treasures. As the sun dipped below the horizon, painting the sky in hues of pink and gold, I felt a deep sense of gratitude for the beauty of nature." },
        { title: 'Mountain Retreat', content: "Nestled among towering peaks, the mountain retreat offered a sanctuary away from the chaos of everyday life. Surrounded by pristine wilderness, I found solace in the simplicity of nature and the company of kindred spirits. Each hike unveiled breathtaking vistas, reminding me of the boundless wonders waiting to be discovered." },
      
        // Recipe Collection
        { title: 'Sunday Brunch', content: "Today, I decided to treat myself to a leisurely Sunday brunch at home. Armed with fresh ingredients and culinary inspiration, I whipped up a feast fit for royalty. From fluffy pancakes drizzled with maple syrup to perfectly poached eggs atop creamy avocado toast, every bite was a symphony of flavors that brought joy to my taste buds." },
        { title: 'Pasta Perfection', content: "Experimenting in the kitchen, I embarked on a quest to create the ultimate pasta dish. With a medley of seasonal vegetables, aromatic herbs, and al dente pasta, I crafted a masterpiece that surpassed my wildest expectations. As I savored each forkful, I marveled at the power of simple ingredients to create culinary magic." },
        { title: 'Baking Bliss', content: "Today, the kitchen transformed into a haven of creativity as I indulged my passion for baking. Armed with flour, sugar, and a dash of imagination, I embarked on a culinary adventure that culminated in a symphony of sweet delights. From decadent chocolate chip cookies to delicate raspberry tarts, each creation was a labor of love that brought joy to all who tasted them." },

        // Fitness Journey
        { title: 'Morning Workout', content: "Started my day with an energizing workout session. The morning air was crisp, and the sunrise provided the perfect backdrop for my exercise routine. Pushed myself to new limits, focusing on strength training and cardio. Feeling invigorated and ready to tackle the day ahead!" },
        { title: 'Trail Run Adventure', content: "Ventured into the great outdoors for a scenic trail run. Surrounded by towering trees and chirping birds, I embraced the natural beauty of the landscape. Each step filled me with a sense of freedom and exhilaration. Running through challenging terrain reminded me of the importance of perseverance and determination." },
        { title: 'Fitness Milestone Celebration', content: "Today marks a significant milestone in my fitness journey. Reflecting on the progress I've made, from setting ambitious goals to staying consistent with my workouts, fills me with a sense of pride and accomplishment. Celebrating this achievement with a nutritious meal and some well-deserved rest. Here's to many more milestones on the road to a healthier lifestyle!" }      
    ]
}

module.exports = {seedData}