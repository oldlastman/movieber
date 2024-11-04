import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle } from './ui/card';
import { Checkbox } from './ui/checkbox';
import { Calendar, Film, LayoutGrid, Moon, Sun } from 'lucide-react';
import { Button } from './ui/button';

const MovieList = () => {
  // Lista inicial de películas
  const initialMovies = [
    { id: 1, day: 1, title: "Blade Runner", year: 1982, description: "Explora una ciudad distópica y la humanidad de los replicantes" },
    { id: 2, day: 2, title: "Tron", year: 1982, description: "Sumérgete en el mundo virtual de una computadora" },
    { id: 3, day: 3, title: "El Señor de los Anillos: La Comunidad del Anillo", year: 2001, description: "Una aventura épica en la Tierra Media" },
    { id: 4, day: 4, title: "Ghost in the Shell", year: 1995, description: "Refleja sobre la identidad y la fusión de lo humano con la tecnología" },
    { id: 5, day: 5, title: "Matrix", year: 1999, description: "La famosa distopía que desafía la realidad y la inteligencia artificial" },
    { id: 6, day: 6, title: "Ready Player One", year: 2018, description: "Un viaje por un mundo virtual lleno de referencias a la cultura pop" },
    { id: 7, day: 7, title: "Dune", year: 2021, description: "Una obra de ciencia ficción que explora el destino y los misterios del desierto" },
    { id: 8, day: 8, title: "Her", year: 2013, description: "Una historia de amor con un sistema operativo inteligente" },
    { id: 9, day: 9, title: "Star Wars: Episodio IV - Una Nueva Esperanza", year: 1977, description: "Inicia la saga galáctica más famosa" },
    { id: 10, day: 10, title: "Akira", year: 1988, description: "Cyberpunk en una Neo-Tokyo post-apocalíptica" },
    { id: 11, day: 11, title: "El Laberinto del Fauno", year: 2006, description: "Fantasía oscura ambientada en la Guerra Civil Española" },
    { id: 12, day: 12, title: "Minority Report", year: 2002, description: "Una mirada al futuro de la tecnología y el crimen" },
    { id: 13, day: 13, title: "Big Hero 6", year: 2014, description: "Un equipo de héroes tecnológicos liderados por un joven inventor" },
    { id: 14, day: 14, title: "Avatar", year: 2009, description: "Una exploración de mundos alienígenas y la conexión con la naturaleza" },
    { id: 15, day: 15, title: "El Quinto Elemento", year: 1997, description: "Aventura futurista en un universo único" },
    { id: 16, day: 16, title: "Metropolis", year: 1927, description: "Clásico del cine mudo sobre una ciudad futurista y clases sociales" },
    { id: 17, day: 17, title: "WALL-E", year: 2008, description: "Reflexión sobre la tecnología, la ecología y el futuro de la humanidad" },
    { id: 18, day: 18, title: "Jurassic Park", year: 1993, description: "La ciencia da vida a dinosaurios en una isla aislada" },
    { id: 19, day: 19, title: "2001: Odisea en el Espacio", year: 1968, description: "Un clásico de la ciencia ficción que explora la evolución humana" },
    { id: 20, day: 20, title: "Gattaca", year: 1997, description: "Reflexión sobre la genética, la identidad y la superación" },
    { id: 21, day: 21, title: "Ex Machina", year: 2014, description: "Un thriller psicológico sobre inteligencia artificial y la moralidad" },
    { id: 22, day: 22, title: "Terminator 2: El Juicio Final", year: 1991, description: "La tecnología amenaza el futuro de la humanidad" },
    { id: 23, day: 23, title: "Harry Potter y la Piedra Filosofal", year: 2001, description: "El inicio de una saga de fantasía mágica" },
    { id: 24, day: 24, title: "Elysium", year: 2013, description: "Una sociedad futurista y desigual donde la tecnología es privilegio de pocos" },
    { id: 25, day: 25, title: "Ender's Game", year: 2013, description: "Un entrenamiento espacial para enfrentar una amenaza alienígena" },
    { id: 26, day: 26, title: "El Viaje de Chihiro", year: 2001, description: "Una historia mágica y mística llena de personajes únicos" },
    { id: 27, day: 27, title: "Iron Man", year: 2008, description: "La tecnología se convierte en superhéroe" },
    { id: 28, day: 28, title: "Soylent Green", year: 1973, description: "Una distopía donde los recursos son escasos y el misterio reina" },
    { id: 29, day: 29, title: "El Gigante de Hierro", year: 1999, description: "Una amistad entre un niño y un robot en plena Guerra Fría" },
    { id: 30, day: 30, title: "La Guerra de las Galaxias: El Imperio Contraataca", year: 1980, description: "Continúa la aventura espacial épica" }
 
  ];

  const [movies, setMovies] = useState(() => {
    // Intentar obtener el estado guardado del localStorage
    const savedMovies = localStorage.getItem('moviemberMovies');
    if (savedMovies) {
      return JSON.parse(savedMovies);
    }
    // Si no hay estado guardado, inicializar con el estado por defecto
    return initialMovies.map(movie => ({
      ...movie,
      completed: false
    }));
  });
  
  const [viewMode, setViewMode] = useState('calendar');

  const [darkMode, setDarkMode] = useState(() => {
    // Verificar si hay una preferencia guardada
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    // Actualizar la clase dark en el html cuando cambie el modo
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    // Guardar preferencia en localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  // Guardar en localStorage cada vez que cambie el estado de las películas
  useEffect(() => {
    localStorage.setItem('moviemberMovies', JSON.stringify(movies));
  }, [movies]);

  const toggleMovie = (id) => {
    setMovies(movies.map(movie =>
      movie.id === id ? { ...movie, completed: !movie.completed } : movie
    ));
  };

  const getProgress = () => {
    const completed = movies.filter(movie => movie.completed).length;
    return Math.round((completed / movies.length) * 100);
  };

  const getDaysInMonth = () => {
    const days = [];
    for (let i = 0; i < 35; i++) {
      const dayNumber = i - 3;
      if (dayNumber > 0 && dayNumber <= 30) {
        const movie = movies.find(m => m.day === dayNumber);
        days.push({ dayNumber, movie });
      } else {
        days.push({ dayNumber: null, movie: null });
      }
    }
    return days;
  };

  const CalendarView = () => (
    <div className="grid grid-cols-7 gap-2 p-4">
      {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(day => (
        <div key={day} className="text-center font-medium text-sm text-gray-500 dark:text-gray-400 p-2">
          {day}
        </div>
      ))}
      {getDaysInMonth().map((day, index) => (
        <div 
          key={index}
          className={`relative min-h-24 p-2 border rounded-lg 
            ${day.dayNumber ? 'dark:bg-gray-800 bg-white hover:shadow-md transition-shadow' : 'bg-gray-50 dark:bg-gray-900'}
            ${day.movie?.completed ? 'bg-green-50 dark:bg-green-900/30' : ''}
            dark:border-gray-700`}
        >
          {day.dayNumber && (
            <>
              <div className="absolute top-2 right-2 text-sm text-gray-400 dark:text-gray-600">
                {day.dayNumber}
              </div>
              {day.movie && (
                <div className="pt-4">
                  <div className="flex items-start gap-2">
                    <Checkbox
                      checked={day.movie.completed}
                      onCheckedChange={() => toggleMovie(day.movie.id)}
                      className="mt-1 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 dark:data-[state=checked]:bg-green-500 dark:data-[state=checked]:border-green-500"
                    />
                    <div className="flex-1">
                      <h4 className={`text-sm font-medium ${day.movie.completed ? 'line-through text-gray-400 dark:text-gray-600' : 'text-gray-900 dark:text-gray-100'}`}>
                        {day.movie.title}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1 line-clamp-2">
                        {day.movie.description}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      ))}
    </div>
  );

  const GridView = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 p-4">
      {movies.map((movie) => (
        <div 
          key={movie.id}
          className={`relative p-3 rounded-lg border transition-all duration-200 hover:shadow-md 
            ${movie.completed ? 'bg-green-50 dark:bg-green-900/30 border-gray-200 dark:border-gray-700' : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:border-green-300 dark:hover:border-green-700'}`}
        >
          <div className="flex items-start gap-3">
            <Checkbox
              checked={movie.completed}
              onCheckedChange={() => toggleMovie(movie.id)}
              className="mt-1 data-[state=checked]:bg-green-600 data-[state=checked]:border-green-600 dark:data-[state=checked]:bg-green-500 dark:data-[state=checked]:border-green-500"
            />
            <div className="flex-1 min-w-0">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                  Día {movie.day}
                </span>
                <h3 className={`font-medium truncate ${movie.completed ? 'line-through text-gray-400 dark:text-gray-600' : 'text-gray-900 dark:text-gray-100'}`}>
                  {movie.title}
                </h3>
              </div>
              <p className={`text-sm mt-1 line-clamp-2 ${movie.completed ? 'line-through text-gray-400 dark:text-gray-600' : 'text-gray-600 dark:text-gray-300'}`}>
                {movie.description}
              </p>
            </div>
          </div>
          <span className="absolute top-3 right-3 text-xs font-medium text-gray-400 dark:text-gray-600">
            {movie.year}
          </span>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-4 transition-colors duration-200">
      <Card className="max-w-7xl mx-auto dark:bg-gray-800 dark:border-gray-700">
        <CardHeader className="space-y-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Film className="w-6 h-6 text-gray-600 dark:text-gray-400" />
              <CardTitle className="dark:text-gray-100">Reto de Películas - Moviember - Noviembre 2024</CardTitle>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-sm font-medium dark:text-gray-100">
                <Calendar className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                <span>Progreso: {getProgress()}% ({movies.filter(movie => movie.completed).length}/{movies.length})</span>
              </div>
              <div className="flex gap-2">
                <Button 
                  variant={viewMode === 'calendar' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('calendar')}
                  className="text-gray-600 dark:text-gray-400"
                >
                  <Calendar className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'outline'}
                  size="icon"
                  onClick={() => setViewMode('grid')}
                  className="text-gray-600 dark:text-gray-400"
                >
                  <LayoutGrid className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={() => setDarkMode(!darkMode)}
                  className="text-gray-600 dark:text-gray-400"
                >
                  {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </Button>
              </div>
            </div>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
            <div 
              className="bg-green-600 dark:bg-green-500 h-2 rounded-full transition-all duration-300" 
              style={{ width: `${getProgress()}%` }}
            />
          </div>
        </CardHeader>
        {viewMode === 'calendar' ? <CalendarView /> : <GridView />}
      </Card>
    </div>
  );
};

export default MovieList;