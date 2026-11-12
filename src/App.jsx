import React, { useState } from 'react';
import {
  TreeDeciduous,
  Play,
  Search,
  UserPlus,
  Home,
  CheckCircle2,
  Clock,
  BookOpen,
  Eye,
  EyeOff,
  Sparkles,
  X,
  Award,
  Users,
} from 'lucide-react';

const VIDEOS_ESTUDIO = [
  {
    id: 1,
    titulo: 'Bienvenida y Cultura Organizacional',
    descripcion: 'Conoce nuestros valores, cómo trabajamos en equipo y los beneficios pensados para tu crecimiento.',
    categoria: 'Bienestar',
    duracion: '8 min',
    instructor: 'Laura Gómez • Talento Humano',
    colorFondo: 'from-lime-400 to-emerald-500',
    puntosClave: [
      'Nuestros pilares de colaboración y respeto',
      'Canales de comunicación interna y apoyo',
      'Rutas de crecimiento dentro de la empresa',
    ],
  },
  {
    id: 2,
    titulo: 'Herramientas Digitales y Productividad Diaria',
    descripcion: 'Aprende a organizar tu jornada, gestionar tareas y aprovechar nuestras plataformas colaborativas.',
    categoria: 'Tecnología',
    duracion: '14 min',
    instructor: 'Carlos Méndez • Innovación',
    colorFondo: 'from-emerald-400 to-teal-600',
    puntosClave: [
      'Gestión efectiva del tiempo y prioridades',
      'Buenas prácticas en reuniones virtuales',
      'Atajos útiles en tus herramientas de trabajo',
    ],
  },
  {
    id: 3,
    titulo: 'Seguridad de la Información en el Día a Día',
    descripcion: 'Consejos prácticos y sencillos para proteger tus cuentas, contraseñas y datos de la compañía.',
    categoria: 'Seguridad',
    duracion: '10 min',
    instructor: 'Andrea Ruiz • Ciberseguridad',
    colorFondo: 'from-lime-500 to-green-600',
    puntosClave: [
      'Cómo identificar correos sospechosos (phishing)',
      'Creación y manejo seguro de contraseñas',
      'Protección de dispositivos dentro y fuera de la oficina',
    ],
  },
  {
    id: 4,
    titulo: 'Comunicación Asertiva y Trabajo en Equipo',
    descripcion: 'Técnicas amables y efectivas para dar retroalimentación, escuchar activamente y resolver retos juntos.',
    categoria: 'Liderazgo',
    duracion: '12 min',
    instructor: 'Sofía Castro • Desarrollo Organizacional',
    colorFondo: 'from-teal-400 to-emerald-600',
    puntosClave: [
      'Escucha activa en equipos multidisciplinarios',
      'Cómo expresar ideas con claridad y empatía',
      'Acuerdos de equipo para evitar malentendidos',
    ],
  },
  {
    id: 5,
    titulo: 'Pausas Activas y Ergonomía en tu Espacio',
    descripcion: 'Cuida tu postura, reduce la fatiga visual y recarga energía con ejercicios de 5 minutos.',
    categoria: 'Bienestar',
    duracion: '6 min',
    instructor: 'Dr. Mateo Vargas • Salud Ocupacional',
    colorFondo: 'from-lime-400 to-green-500',
    puntosClave: [
      'Ajuste ideal de silla, pantalla y teclado',
      'Estiramientos rápidos para cuello y espalda',
      'Hábitos saludables durante la jornada laboral',
    ],
  },
  {
    id: 6,
    titulo: 'Gestión de Proyectos Ágiles para Todos',
    descripcion: 'Descubre cómo dividir grandes objetivos en pasos pequeños y celebrar avances constantes.',
    categoria: 'Tecnología',
    duracion: '16 min',
    instructor: 'Daniela Ortiz • Operaciones',
    colorFondo: 'from-green-500 to-emerald-700',
    puntosClave: [
      'Tableros visuales para dar seguimiento a tareas',
      'Reuniones breves de sincronización diaria',
      'Mejora continua después de cada entrega',
    ],
  },
];

const CATEGORIAS = ['Todos', 'Bienestar', 'Tecnología', 'Liderazgo', 'Seguridad'];

export default function App() {
  const [vistaActiva, setVistaActiva] = useState('inicio');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');
  const [videosCompletados, setVideosCompletados] = useState([1]);
  const [videoModal, setVideoModal] = useState(null);

  const [formulario, setFormulario] = useState({
    nombre: '',
    correo: '',
    rol: '',
    departamento: '',
    contrasena: '',
  });
  const [mostrarContrasena, setMostrarContrasena] = useState(false);
  const [registroExitoso, setRegistroExitoso] = useState(false);

  const videosFiltrados = VIDEOS_ESTUDIO.filter((video) => {
    const coincideCategoria =
      categoriaSeleccionada === 'Todos' || video.categoria === categoriaSeleccionada;
    const coincideTexto =
      video.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
      video.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    return coincideCategoria && coincideTexto;
  });

  const alternarCompletado = (id) => {
    setVideosCompletados((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const manejarCambio = (e) => {
    const { name, value } = e.target;
    setFormulario((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const manejarEnvio = (e) => {
    e.preventDefault();
    setRegistroExitoso(true);
  };

  const reiniciarFormulario = () => {
    setFormulario({
      nombre: '',
      correo: '',
      rol: '',
      departamento: '',
      contrasena: '',
    });
    setRegistroExitoso(false);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Barra de Navegación Superior */}
      <header className="sticky top-0 z-30 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between">
          <button
            onClick={() => setVistaActiva('inicio')}
            className="flex items-center gap-3 text-left group focus:outline-none"
          >
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-lime-400 to-lime-600 flex items-center justify-center text-white shadow-lg shadow-lime-200 group-hover:scale-105 transition-transform">
              <TreeDeciduous className="w-7 h-7" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-tight text-slate-900 block leading-none">
                Raíz<span className="text-lime-600">Aprende</span>
              </span>
              <span className="text-xs font-medium text-slate-500">
                Academia Corporativa
              </span>
            </div>
          </button>

          <nav className="flex items-center gap-2 bg-slate-100 p-1.5 rounded-2xl">
            <button
              onClick={() => setVistaActiva('inicio')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                vistaActiva === 'inicio'
                  ? 'bg-white text-lime-700 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Inicio</span>
            </button>

            <button
              onClick={() => setVistaActiva('formulario')}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                vistaActiva === 'formulario'
                  ? 'bg-lime-500 text-slate-950 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <UserPlus className="w-4 h-4" />
              <span>Registro</span>
            </button>
          </nav>
        </div>
      </header>

      {/* Contenido Principal */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8 sm:py-10">
        {vistaActiva === 'inicio' ? (
          <div className="space-y-10">
            {/* Banner de Bienvenida Interactivo */}
            <section className="relative overflow-hidden rounded-[2rem] bg-gradient-to-br from-lime-50 via-white to-emerald-50 border border-lime-200/80 p-8 sm:p-12 shadow-sm">
              <div className="max-w-2xl space-y-5 relative z-10">
                <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-lime-200/70 text-lime-900 text-xs font-bold">
                  <Sparkles className="w-4 h-4 text-lime-700" />
                  <span>Crece cada día con tu equipo</span>
                </div>

                <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-tight">
                  Tu espacio de aprendizaje y{' '}
                  <span className="text-lime-600">crecimiento profesional</span>
                </h1>

                <p className="text-slate-600 text-base sm:text-lg leading-relaxed">
                  Explora cápsulas de video prácticas diseñadas para ayudarte en tu
                  día a día, fortalecer tus habilidades y compartir conocimiento con
                  toda la empresa.
                </p>

                <div className="flex flex-wrap items-center gap-4 pt-2">
                  <button
                    onClick={() => setVistaActiva('formulario')}
                    className="inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold shadow-md shadow-lime-200 transition-all cursor-pointer"
                  >
                    <UserPlus className="w-5 h-5" />
                    <span>Crear mi perfil de estudio</span>
                  </button>

                  <div className="flex items-center gap-2 text-sm font-medium text-slate-600 bg-white/80 px-4 py-3 rounded-2xl border border-slate-200/70">
                    <CheckCircle2 className="w-5 h-5 text-lime-600" />
                    <span>
                      Has completado{' '}
                      <strong className="text-slate-900">
                        {videosCompletados.length} de {VIDEOS_ESTUDIO.length}
                      </strong>{' '}
                      clases
                    </span>
                  </div>
                </div>
              </div>

              <div className="hidden lg:flex absolute right-10 top-1/2 -translate-y-1/2 w-56 h-56 rounded-full bg-lime-400/20 items-center justify-center">
                <div className="w-40 h-40 rounded-full bg-lime-400/30 flex items-center justify-center text-lime-600">
                  <TreeDeciduous className="w-24 h-24" />
                </div>
              </div>
            </section>

            {/* Tarjetas Rápidas de Estadísticas */}
            <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-white p-5 rounded-3xl border border-slate-200/70 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-lime-100 text-lime-700 flex items-center justify-center">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-slate-900">
                    {VIDEOS_ESTUDIO.length} Cursos
                  </p>
                  <p className="text-sm text-slate-500">Disponibles para ti</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200/70 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-slate-900">100% Práctico</p>
                  <p className="text-sm text-slate-500">Videos cortos y claros</p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-3xl border border-slate-200/70 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-700 flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-slate-900">A tu ritmo</p>
                  <p className="text-sm text-slate-500">Aprende cuando quieras</p>
                </div>
              </div>
            </section>

            {/* Buscador y Filtros por Categoría */}
            <section className="space-y-6">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl font-extrabold text-slate-900">
                    Videos de Estudio
                  </h2>
                  <p className="text-sm text-slate-500">
                    Selecciona una clase para ver el contenido y marcar tu avance
                  </p>
                </div>

                <div className="relative w-full md:w-80">
                  <Search className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder="Buscar tema o video..."
                    value={busqueda}
                    onChange={(e) => setBusqueda(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-white border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:ring-lime-500"
                  />
                </div>
              </div>

              <div className="flex flex-wrap gap-2">
                {CATEGORIAS.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setCategoriaSeleccionada(cat)}
                    className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all cursor-pointer ${
                      categoriaSeleccionada === cat
                        ? 'bg-lime-500 text-slate-950 shadow-sm'
                        : 'bg-white text-slate-600 border border-slate-200 hover:border-lime-400'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>

              {videosFiltrados.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {videosFiltrados.map((video) => {
                    const completado = videosCompletados.includes(video.id);
                    return (
                      <article
                        key={video.id}
                        className="bg-white rounded-3xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-md transition-all flex flex-col"
                      >
                        <div
                          onClick={() => setVideoModal(video)}
                          className={`h-44 bg-gradient-to-br ${video.colorFondo} p-5 flex flex-col justify-between relative cursor-pointer group`}
                        >
                          <div className="flex items-center justify-between">
                            <span className="px-3 py-1 rounded-full bg-white/90 text-slate-800 text-xs font-bold">
                              {video.categoria}
                            </span>
                            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-900/60 text-white text-xs font-medium">
                              <Clock className="w-3.5 h-3.5" />
                              {video.duracion}
                            </span>
                          </div>

                          <div className="self-center w-14 h-14 rounded-full bg-white/95 text-lime-600 flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                            <Play className="w-6 h-6 fill-current ml-0.5" />
                          </div>

                          <div className="h-2" />
                        </div>

                        <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                          <div className="space-y-2">
                            <h3 className="text-lg font-bold text-slate-900 leading-snug">
                              {video.titulo}
                            </h3>
                            <p className="text-sm text-slate-600 line-clamp-2">
                              {video.descripcion}
                            </p>
                            <p className="text-xs font-medium text-slate-400 pt-1">
                              {video.instructor}
                            </p>
                          </div>

                          <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                            <button
                              onClick={() => setVideoModal(video)}
                              className="flex-1 py-2.5 px-4 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold text-sm transition-colors cursor-pointer"
                            >
                              Ver clase
                            </button>

                            <button
                              onClick={() => alternarCompletado(video.id)}
                              title={
                                completado
                                  ? 'Marcar como pendiente'
                                  : 'Marcar como completado'
                              }
                              className={`p-2.5 rounded-xl border transition-colors cursor-pointer ${
                                completado
                                  ? 'bg-lime-100 border-lime-300 text-lime-700'
                                  : 'bg-slate-50 border-slate-200 text-slate-400 hover:text-slate-600'
                              }`}
                            >
                              <CheckCircle2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              ) : (
                <div className="bg-white rounded-3xl border border-slate-200 p-12 text-center space-y-3">
                  <p className="text-lg font-bold text-slate-800">
                    No encontramos videos con esa búsqueda
                  </p>
                  <p className="text-sm text-slate-500">
                    Intenta con otra palabra clave o selecciona otra categoría.
                  </p>
                </div>
              )}
            </section>
          </div>
        ) : (
          /* VISTA DEL FORMULARIO AMIGABLE (5 CAMPOS EXACTOS) */
          <section className="max-w-xl mx-auto">
            <div className="bg-white rounded-[2rem] border border-slate-200/80 shadow-sm p-8 sm:p-10">
              {!registroExitoso ? (
                <>
                  <div className="text-center space-y-2 mb-8">
                    <div className="w-14 h-14 rounded-2xl bg-lime-100 text-lime-600 flex items-center justify-center mx-auto mb-3">
                      <TreeDeciduous className="w-8 h-8" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                      Registro de Colaborador
                    </h1>
                    <p className="text-sm text-slate-500">
                      Completa tus datos para acceder a tu ruta de aprendizaje
                    </p>
                  </div>

                  <form onSubmit={manejarEnvio} className="space-y-5">
                    <div>
                      <label
                        htmlFor="nombre"
                        className="block text-sm font-bold text-slate-700 mb-1.5"
                      >
                        Nombre completo
                      </label>
                      <input
                        id="nombre"
                        name="nombre"
                        type="text"
                        required
                        placeholder="Ej. Ana María Torres"
                        value={formulario.nombre}
                        onChange={manejarCambio}
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-lime-500 transition-all"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="correo"
                        className="block text-sm font-bold text-slate-700 mb-1.5"
                      >
                        Correo corporativo
                      </label>
                      <input
                        id="correo"
                        name="correo"
                        type="email"
                        required
                        placeholder="ana.torres@empresa.com"
                        value={formulario.correo}
                        onChange={manejarCambio}
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-lime-500 transition-all"
                      />
                    </div>

                    <div>
                      <label
                        htmlFor="rol"
                        className="block text-sm font-bold text-slate-700 mb-1.5"
                      >
                        Rol
                      </label>
                      <select
                        id="rol"
                        name="rol"
                        required
                        value={formulario.rol}
                        onChange={manejarCambio}
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-lime-500 transition-all"
                      >
                        <option value="" disabled>
                          Selecciona tu rol
                        </option>
                        <option value="COLABORADOR">Colaborador</option>
                        <option value="ANALISTA">Analista</option>
                        <option value="COORDINADOR">Coordinador</option>
                        <option value="LIDER_EQUIPO">Líder de Equipo</option>
                        <option value="ADMINISTRADOR">Administrador</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="departamento"
                        className="block text-sm font-bold text-slate-700 mb-1.5"
                      >
                        Departamento
                      </label>
                      <select
                        id="departamento"
                        name="departamento"
                        required
                        value={formulario.departamento}
                        onChange={manejarCambio}
                        className="w-full px-4 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-lime-500 transition-all"
                      >
                        <option value="" disabled>
                          Selecciona tu departamento
                        </option>
                        <option value="TECNOLOGIA">Tecnología y Sistemas</option>
                        <option value="RECURSOS_HUMANOS">Recursos Humanos</option>
                        <option value="OPERACIONES">Operaciones</option>
                        <option value="MARKETING">Marketing y Comunicación</option>
                        <option value="FINANZAS">Finanzas y Administración</option>
                        <option value="ATENCION_CLIENTE">Atención al Cliente</option>
                      </select>
                    </div>

                    <div>
                      <label
                        htmlFor="contrasena"
                        className="block text-sm font-bold text-slate-700 mb-1.5"
                      >
                        Contraseña
                      </label>
                      <div className="relative">
                        <input
                          id="contrasena"
                          name="contrasena"
                          type={mostrarContrasena ? 'text' : 'password'}
                          required
                          minLength={6}
                          placeholder="Mínimo 6 caracteres"
                          value={formulario.contrasena}
                          onChange={manejarCambio}
                          className="w-full pl-4 pr-12 py-3 rounded-2xl bg-slate-50 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-lime-500 transition-all"
                        />
                        <button
                          type="button"
                          onClick={() => setMostrarContrasena(!mostrarContrasena)}
                          className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-700 p-1"
                        >
                          {mostrarContrasena ? (
                            <EyeOff className="w-5 h-5" />
                          ) : (
                            <Eye className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-2xl bg-lime-500 hover:bg-lime-400 text-slate-950 font-extrabold text-base shadow-md shadow-lime-200 transition-all cursor-pointer mt-2"
                    >
                      Completar Registro
                    </button>
                  </form>
                </>
              ) : (
                <div className="text-center py-6 space-y-6">
                  <div className="w-20 h-20 rounded-full bg-lime-100 text-lime-600 flex items-center justify-center mx-auto">
                    <CheckCircle2 className="w-11 h-11" />
                  </div>

                  <div className="space-y-2">
                    <h2 className="text-2xl font-extrabold text-slate-900">
                      ¡Bienvenido/a, {formulario.nombre}!
                    </h2>
                    <p className="text-slate-600 text-sm max-w-md mx-auto">
                      Tu cuenta ha sido creada con éxito. Ya puedes explorar todos
                      los videos preparados para tu equipo.
                    </p>
                  </div>

                  <div className="bg-slate-50 rounded-2xl p-5 text-left space-y-2 border border-slate-200/70 text-sm">
                    <p>
                      <span className="font-bold text-slate-700">Correo:</span>{' '}
                      <span className="text-slate-600">{formulario.correo}</span>
                    </p>
                    <p>
                      <span className="font-bold text-slate-700">Rol:</span>{' '}
                      <span className="text-slate-600">{formulario.rol}</span>
                    </p>
                    <p>
                      <span className="font-bold text-slate-700">Departamento:</span>{' '}
                      <span className="text-slate-600">{formulario.departamento}</span>
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-3 pt-2">
                    <button
                      onClick={() => setVistaActiva('inicio')}
                      className="flex-1 py-3 px-5 rounded-2xl bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold text-sm transition-colors cursor-pointer"
                    >
                      Ir a los videos de estudio
                    </button>
                    <button
                      onClick={reiniciarFormulario}
                      className="py-3 px-5 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-sm transition-colors cursor-pointer"
                    >
                      Registrar otro usuario
                    </button>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}
      </main>

      {/* Pie de Página */}
      <footer className="bg-white border-t border-slate-200/80 py-6 mt-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-slate-500">
          <div className="flex items-center gap-2 font-semibold text-slate-700">
            <TreeDeciduous className="w-4 h-4 text-lime-600" />
            <span>RaízAprende • Plataforma Interna de Capacitación</span>
          </div>
          <p>Aprendiendo juntos cada día</p>
        </div>
      </footer>

      {/* Modal Reproductor de Video */}
      {videoModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-[2rem] max-w-2xl w-full overflow-hidden shadow-2xl">
            <div
              className={`h-64 sm:h-72 bg-gradient-to-br ${videoModal.colorFondo} p-6 flex flex-col justify-between text-white relative`}
            >
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-black/25 text-xs font-bold">
                  {videoModal.categoria} • {videoModal.duracion}
                </span>
                <button
                  onClick={() => setVideoModal(null)}
                  className="w-9 h-9 rounded-full bg-black/25 hover:bg-black/40 flex items-center justify-center transition-colors cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="text-center space-y-2">
                <div className="w-16 h-16 rounded-full bg-white text-lime-600 flex items-center justify-center mx-auto shadow-lg">
                  <Play className="w-7 h-7 fill-current ml-1" />
                </div>
                <p className="text-sm font-semibold text-white/95">
                  Reproduciendo clase: {videoModal.titulo}
                </p>
              </div>

              <div className="space-y-1.5">
                <div className="w-full h-1.5 bg-white/30 rounded-full overflow-hidden">
                  <div className="w-1/3 h-full bg-white rounded-full" />
                </div>
                <div className="flex justify-between text-[11px] font-medium text-white/80">
                  <span>02:15</span>
                  <span>{videoModal.duracion}</span>
                </div>
              </div>
            </div>

            <div className="p-6 sm:p-8 space-y-5">
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">
                  {videoModal.titulo}
                </h3>
                <p className="text-xs font-medium text-slate-500 mt-1">
                  {videoModal.instructor}
                </p>
                <p className="text-sm text-slate-600 mt-3 leading-relaxed">
                  {videoModal.descripcion}
                </p>
              </div>

              <div className="bg-lime-50/80 border border-lime-200/80 rounded-2xl p-4 space-y-2">
                <p className="text-xs font-extrabold uppercase tracking-wider text-lime-800">
                  Lo que aprenderás en este video:
                </p>
                <ul className="space-y-1.5 text-sm text-slate-700">
                  {videoModal.puntosClave.map((punto, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-lime-600 shrink-0 mt-0.5" />
                      <span>{punto}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  onClick={() => {
                    alternarCompletado(videoModal.id);
                    setVideoModal(null);
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-lime-500 hover:bg-lime-400 text-slate-950 font-bold text-sm transition-colors cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>
                    {videosCompletados.includes(videoModal.id)
                      ? 'Clase completada'
                      : 'Marcar como vista'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
