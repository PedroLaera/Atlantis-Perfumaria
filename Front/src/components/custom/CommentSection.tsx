import { useEffect, useState } from "react";
import { api } from "../../services/api";
import { useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface Comment {
  id_comment: number;
  id_user: number;
  id_product: number;
  content: string;
  rating: number;
  creation_date: string;
}

interface User {
  id_user: number;
  name: string;
}

interface DecodedToken {
  id_user: number;
  email: string;
  iat: number;
  exp: number;
}

export default function CommentCard() {
  const { id } = useParams<{ id: string }>();
  const [comments, setComments] = useState<Comment[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [content, setContent] = useState("");
  const [rating, setRating] = useState(5);
  const [editId, setEditId] = useState<number | null>(null);

  const token = localStorage.getItem("token");
  const decoded: DecodedToken | null = token ? jwtDecode(token) : null;

  const fetchComments = async () => {
    try {
      const response = await api.get("/comment", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const allComments: Comment[] = response.data;
      const filtered = allComments.filter((c) => c.id_product === Number(id));
      setComments(filtered);
    } catch (error) {
      console.error("Erro ao buscar comentários:", error);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await api.get("/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(response.data);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  };

  useEffect(() => {
    fetchComments();
    fetchUsers();
  }, [id]);

  const handleSubmit = async () => {
    if (!content.trim()) return;

    try {
      if (editId) {
        await api.put(
          `/comment/${editId}`,
          {
            id_user: decoded?.id_user,
            id_product: id,
            content,
            rating,
            creation_date: new Date(),
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await api.post(
          "/comment",
          {
            id_user: decoded?.id_user,
            id_product: id,
            content,
            rating,
            creation_date: new Date(),
          },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }

      setContent("");
      setRating(5);
      setEditId(null);
      fetchComments();
    } catch (error) {
      console.error("Erro ao enviar comentário:", error);
    }
  };

  const handleDelete = async (id_comment: number) => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este comentário?"
    );
    if (!confirmDelete) return;

    try {
      await api.delete(`/comment/${id_comment}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchComments();
    } catch (error) {
      console.error("Erro ao deletar comentário:", error);
    }
  };

  const handleEdit = (comment: Comment) => {
    setEditId(comment.id_comment);
    setContent(comment.content);
    setRating(comment.rating);
  };

  const renderStars = (count: number) => {
    return (
      <div className="text-yellow-500">
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i}>{i < count ? "⭐" : "☆"}</span>
        ))}
      </div>
    );
  };

  const getUserName = (id_user: number) => {
    const user = users.find((u) => u.id_user === id_user);
    return user ? user.name : "Nome não disponível";
  };

  return (
    <div className="mt-10 bg-gray-100 p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Comentários</h2>

      <textarea
        className="w-full p-2 border rounded mb-2"
        placeholder="Escreva seu comentário..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="flex items-center gap-4 mb-4">
        <label className="font-medium">Nota:</label>
        <input
          type="number"
          className="w-16 p-1 border rounded"
          value={rating}
          min={1}
          max={5}
          onChange={(e) => setRating(Number(e.target.value))}
          placeholder="1-5"
        />
        <button
          onClick={handleSubmit}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          {editId ? "Atualizar Comentário" : "Enviar Comentário"}
        </button>
      </div>

      <div className="space-y-4">
        {comments.map((comment) => (
          <div
            key={comment.id_comment}
            className="bg-white p-4 rounded shadow flex flex-col"
          >
            <div className="flex justify-between items-center">
              <p className="text-gray-800">
                <span className="font-semibold">Usuário:</span> ID{" "}
                {comment.id_user} - {getUserName(comment.id_user)}
              </p>
              <span className="text-sm text-gray-500">
                {new Date(comment.creation_date).toLocaleString()}
              </span>
            </div>
            <p className="mt-2">{comment.content}</p>
            <div className="mt-1">{renderStars(comment.rating)}</div>

            {decoded?.id_user === comment.id_user && (
              <div className="mt-2 flex gap-2">
                <button
                  onClick={() => handleEdit(comment)}
                  className="text-blue-600 hover:underline"
                >
                  Editar
                </button>
                <button
                  onClick={() => handleDelete(comment.id_comment)}
                  className="text-red-600 hover:underline"
                >
                  Excluir
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
