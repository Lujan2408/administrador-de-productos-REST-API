import app from './server';
import colors from 'colors';

// Set the port
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(3000, () => {
  console.log(colors.cyan.bold(`Server running on port ${PORT}`));
});