export const getStatusColor = (status: string) => {
    switch (status) {
      case "Validated":
        return "bg-yellow-100 text-yellow-600 border-yellow-600 border";
      case "Queued":
        return "bg-sky-100 text-sky-600 border-sky-600 border";
      case "Scheduled":
        return "bg-gray-100 text-black border-black border";
      case "Active":
        return "bg-green-100 text-green-600 border-green-600 border";
      case "InActive":
        return "bg-red-100 text-red-600 border-red-600 border";
      default:
        return "";
    }
  };