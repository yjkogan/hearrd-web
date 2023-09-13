const Footer = () => {
  return (
    <footer className="py-4 mt-16">
      <div className="container mx-auto text-center">
        <p className="text-gray-600">
          Made with love by
          <a
            href="https://github.com/yjkogan"
            className="text-blue-500 underline hover:text-blue-600 ml-1 mr-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            yjkogan
          </a>
          (with help from ChatGPT for copy and styling)
        </p>
      </div>
    </footer>
  );
};

export default Footer;
