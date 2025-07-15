# Socket.IO Client

A real-time chat application built with Next.js, Socket.IO, and TypeScript. This project demonstrates a complete client-side implementation for a real-time messaging system with authentication.

## 🚀 Features

- **Real-time Messaging**: Instant message delivery using Socket.IO
- **User Authentication**: Secure login system with token-based authentication
- **Modern UI**: Clean, responsive interface built with Tailwind CSS
- **TypeScript**: Full type safety throughout the application
- **Auto-scroll**: Messages automatically scroll to the latest message
- **Error Handling**: Comprehensive error handling for network issues and authentication failures

## 🛠️ Tech Stack

- **Frontend**: Next.js 15 with React 19
- **Real-time Communication**: Socket.IO Client v4.8.1
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios with interceptors
- **Authentication**: Token-based with cookies
- **Language**: TypeScript
- **Package Manager**: pnpm

## 📋 Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm
- A running Socket.IO server at `http://localhost:3001`

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd socket-io-client
```

### 2. Install Dependencies

```bash
pnpm install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory and add your configuration:

```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
```

### 4. Start the Development Server

```bash
pnpm dev
```

The application will be available at `http://localhost:3000`.

## 📱 Usage

### Authentication

1. Navigate to the home page (`/`)
2. Enter your email and password
3. Click "Submit" to authenticate
4. Upon successful login, you'll be redirected to the chat page

### Chat Interface

1. Once authenticated, you'll see the chat interface
2. Messages are displayed in real-time
3. Type your message in the input field
4. Press "Send" or hit Enter to send your message
5. Messages automatically scroll to show the latest content

## 🏗️ Project Structure

```
socket-io-client/
├── app/                    # Next.js app directory
│   ├── chat/              # Chat page
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Login page
├── components/            # React components
│   └── chat.tsx          # Chat component
├── context/              # React context
│   └── auth.context.tsx  # Authentication context
├── hooks/                # Custom hooks
│   └── use-axios.ts      # Axios configuration
├── middleware.ts          # Next.js middleware
└── public/               # Static assets
```

## 🔧 Key Components

### Authentication Context (`context/auth.context.tsx`)

- Manages user authentication state
- Provides login/logout functionality
- Handles authentication token storage

### Chat Component (`components/chat.tsx`)

- Real-time messaging interface
- Socket.IO connection management
- Message display and input handling

### Axios Hook (`hooks/use-axios.ts`)

- Configured HTTP client with interceptors
- Automatic token handling
- Error handling for authentication failures

## 🔌 Socket.IO Integration

The application connects to a Socket.IO server with the following features:

- **Authentication**: Token-based authentication via socket auth
- **Topic-based Messaging**: Messages are sent to specific topics
- **Real-time Updates**: Instant message delivery
- **Connection Management**: Automatic reconnection and error handling

### Socket Events

- `connect`: Handles successful connection
- `disconnect`: Handles disconnection
- `connect_error`: Handles connection errors
- `test`: Receives messages from the "test" topic
- `publish`: Sends messages to topics

## 🚨 Error Handling

The application includes comprehensive error handling:

- **Network Errors**: Automatic retry and user feedback
- **Authentication Errors**: Automatic redirect to login
- **Socket Errors**: Connection error logging and recovery
- **Form Validation**: Client-side validation with error messages

## 🎨 Styling

The application uses Tailwind CSS for styling with:

- Responsive design
- Dark theme with slate colors
- Smooth transitions and hover effects
- Clean, modern UI components

## 📝 Available Scripts

- `pnpm dev` - Start development server with Turbopack
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm lint` - Run ESLint

## 🔒 Security Features

- Token-based authentication
- Secure cookie handling
- Automatic token refresh
- Protected routes with middleware

## 🚀 Deployment

### Build for Production

```bash
pnpm build
pnpm start
```

### Environment Variables

Make sure to set the following environment variables in production:

- `NEXT_PUBLIC_API_URL`: Your API server URL
- `NEXT_PUBLIC_SOCKET_URL`: Your Socket.IO server URL

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Troubleshooting

### Common Issues

1. **Socket Connection Failed**

   - Ensure the Socket.IO server is running at `http://localhost:3001`
   - Check network connectivity
   - Verify authentication token is valid

2. **Authentication Errors**

   - Clear browser cookies and try again
   - Check server-side authentication endpoint
   - Verify API server is running

3. **Build Errors**
   - Clear `.next` directory and node_modules
   - Reinstall dependencies
   - Check TypeScript configuration

## 📞 Support

For issues and questions, please open an issue on the repository or contact the development team.
