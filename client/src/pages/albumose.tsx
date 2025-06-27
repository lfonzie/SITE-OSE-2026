<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Álbum OSE - Galeria de Fotos | Colégio OSE</title>
</head>
<body>
    <div id="root"></div>

    <script src="https://unpkg.com/react@17/umd/react.development.js"></script>
    <script src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

    <script type="text/babel">
        function HomePage() {
            return (
                <div>
                    <h1>Bem-vindo ao Colégio OSE</h1>
                    <a href="/albumose">Álbum OSE</a>
                </div>
            );
        }

        function AlbumOSE() {
            return (
                <div>
                    <h1>Álbum OSE</h1>
                    <p>Confira as fotos do Colégio OSE!</p>
                    <a href="/" >Voltar para a Página Inicial</a>
                </div>
            );
        }

        function App() {
            const path = window.location.pathname;

            if (path === "/albumose") {
                return <AlbumOSE />;
            } else {
                return <HomePage />;
            }
        }

        ReactDOM.render(
            <App />,
            document.getElementById('root')
        );
    </script>
</body>
</html>